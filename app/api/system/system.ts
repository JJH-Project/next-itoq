'use server'

import { Client } from '@notionhq/client';
import { v2 as cloudinary } from 'cloudinary';
import { SystemPage } from '@/app/types/system';

// set cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// set notion
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// get system data
export async function getSystemData() {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID!,
        });
        
        return response.results.map((page) => {
            if ('properties' in page) {
                return {
                    id: page.id,
                    properties: {
                        title: page.properties.title as SystemPage['properties']['title'],
                        contents: page.properties.contents as SystemPage['properties']['contents'],
                        image: page.properties.image as SystemPage['properties']['image']
                    }
                }
            }
            throw new Error('Invalid page format')
        })
    } catch (error) {
        console.error('Error fetching system data:', error);
        return [];
    }
}

// create system
export const createSystem = async (formData: FormData) => {
    try {
        const title = formData.get('title')?.toString() || ''
        const contents = formData.get('contents')?.toString() || ''
        const imageFile = formData.get('image') as File | null

        let imageUrl = ''
        if (imageFile && imageFile instanceof File) {
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)
            
            const uploadResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'itoq/systems',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                ).end(buffer)
            })

            imageUrl = (uploadResponse as any).secure_url
        }

        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID! },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                contents: {
                    rich_text: [
                        {
                            text: {
                                content: contents
                            }
                        }
                    ]
                },
                ...(imageUrl && {
                    image: {
                        rich_text: [
                            {
                                text: {
                                    content: imageUrl
                                }
                            }
                        ]
                    }
                })
            }
        })

        return { success: true, data: response }
    } catch (error) {
        console.error('Error creating system:', error)
        return { success: false, error: 'Failed to create system' }
    }
}

// delete system
export async function deleteSystemData(id: string) {
    try {
        await notion.pages.update({
            page_id: id,
            archived: true,
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting system:', error);
        throw error;
    }
}

// get system by id
export async function getSystemById(id: string) {
    try {
        const response = await notion.pages.retrieve({
            page_id: id,
        });

        if ('properties' in response) {
            return {
                id: response.id,
                properties: {
                    title: response.properties.title as SystemPage['properties']['title'],
                    contents: response.properties.contents as SystemPage['properties']['contents'],
                    image: response.properties.image as SystemPage['properties']['image']
                }
            };
        }
        throw new Error('Invalid page format');
    } catch (error) {
        console.error('Error fetching system:', error);
        throw error;
    }
}

// update system
export async function updateSystem(id: string, formData: FormData) {
    try {
        const title = formData.get('title')?.toString() || ''
        const contents = formData.get('contents')?.toString() || ''
        const imageFile = formData.get('image') as File | null

        let imageUrl = ''
        if (imageFile && imageFile instanceof File) {
            const bytes = await imageFile.arrayBuffer()
            const buffer = Buffer.from(bytes)

            const uploadResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'itoq/',
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error)
                        else resolve(result)
                    }
                ).end(buffer)
            })

            imageUrl = (uploadResponse as any).secure_url
        }

        const response = await notion.pages.update({
            page_id: id,
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: title
                            }
                        }
                    ]
                },
                contents: {
                    rich_text: [
                        {
                            text: {
                                content: contents
                            }
                        }
                    ]
                },
                ...(imageUrl && {
                    image: {
                        rich_text: [
                            {
                                text: {
                                    content: imageUrl
                                }
                            }
                        ]
                    }
                })
            }
        })

        return { success: true, data: response }
    } catch (error) {
        console.error('Error updating system:', error)
        return { success: false, error: 'Failed to update system' }
    }
}
