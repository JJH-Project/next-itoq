'use server';

import { Client } from '@notionhq/client';
import { v2 as cloudinary } from 'cloudinary';
import { NewsPage } from '@/app/types/news';

// set cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// set notion
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_NEWS_DATABASE_ID;

// get News data
export async function getNewsData() {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID!,
        });

        return response.results.map((page) => {
            if ('properties' in page) {
                return {
                    id: page.id || null,
                    title: page.properties.title.title[0].plain_text || null,
                    contents: page.properties.contents.rich_text[0].plain_text || null,
                    // image: page.properties.image.url || null,
                    created_at: page.properties.created_at.date.start || null,
                } as NewsPage;
            }
        });
    } catch (error) {
        console.error('Error fetching News data:', error);
        return [];
    }
}

// create News
export const createNews = async (formData: FormData) => {
    try {
        console.log('title');
        const title = formData.get('title')?.toString() || '';
        const contents = formData.get('contents')?.toString() || '';
        // const imageFile = formData.get('image') as File | null;

        // let imageUrl = '';
        // if (imageFile && imageFile instanceof File) {
        //     const bytes = await imageFile.arrayBuffer();
        //     const buffer = Buffer.from(bytes);

        //     const uploadResponse = await new Promise((resolve, reject) => {
        //         cloudinary.uploader
        //             .upload_stream(
        //                 {
        //                     folder: 'itoq/news',
        //                     resource_type: 'auto',
        //                 },
        //                 (error, result) => {
        //                     if (error) reject(error);
        //                     else resolve(result);
        //                 }
        //             )
        //             .end(buffer);
        //     });

        //     imageUrl = (uploadResponse as any).secure_url;
        // }

        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID! },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: title,
                            },
                        },
                    ],
                },
                contents: {
                    rich_text: [
                        {
                            text: {
                                content: contents,
                            },
                        },
                    ],
                },
                // ...(imageUrl && {
                //     image: {
                //         rich_text: [
                //             {
                //                 text: {
                //                     content: imageUrl,
                //                 },
                //             },
                //         ],
                //     },
                // }),
                created_at: {
                    // rich_text: [
                    // {
                    date: {
                        start: new Date().toISOString().slice(0, 10),
                    },
                    // },
                    // ],
                },
            },
        });

        return { success: true, data: response };
    } catch (error) {
        console.error('Error creating News:', error);
        return { success: false, error: error };
    }
};

// delete News
export async function deleteNewsData(id: string) {
    try {
        await notion.pages.update({
            page_id: id,
            archived: true,
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting News:', error);
        throw error;
    }
}

// get News by id
export async function getNewsById(id: string) {
    try {
        const response = await notion.pages.retrieve({
            page_id: id,
        });

        if ('properties' in response) {
            return {
                id: response.id,
                title: response.properties.title.title[0].plain_text || null,
                contents: response.properties.contents.rich_text[0].plain_text || null,
                // image: response.properties.image.url || null,
                created_at: response.properties.created_at.date.start || null,
            } as NewsPage;
            //     properties: {
            //         title: response.properties.title as NewsPage['properties']['title'],
            //         contents: response.properties.contents as NewsPage['properties']['contents'],
            //         image: response.properties.image as NewsPage['properties']['image'],
            //         created_at: response.properties
            //             .created_at as NewsPage['properties']['created_at'],
            //     },
            // };
        }
        throw new Error('Invalid page format');
    } catch (error) {
        console.error('Error fetching News:', error);
        throw error;
    }
}

// update News
export async function updateNews(id: string, formData: FormData) {
    try {
        const title = formData.get('title')?.toString() || '';
        const contents = formData.get('contents')?.toString() || '';
        // const imageFile = formData.get('image') as File | null;

        // let imageUrl = '';
        // if (imageFile && imageFile instanceof File) {
        //     const bytes = await imageFile.arrayBuffer();
        //     const buffer = Buffer.from(bytes);

        //     const uploadResponse = await new Promise((resolve, reject) => {
        //         cloudinary.uploader
        //             .upload_stream(
        //                 {
        //                     folder: 'itoq/',
        //                     resource_type: 'auto',
        //                 },
        //                 (error, result) => {
        //                     if (error) reject(error);
        //                     else resolve(result);
        //                 }
        //             )
        //             .end(buffer);
        //     });

        //     imageUrl = (uploadResponse as any).secure_url;
        // }

        const response = await notion.pages.update({
            page_id: id,
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: title,
                            },
                        },
                    ],
                },
                contents: {
                    rich_text: [
                        {
                            text: {
                                content: contents,
                            },
                        },
                    ],
                },
                // ...(imageUrl && {
                //     image: {
                //         rich_text: [
                //             {
                //                 text: {
                //                     content: imageUrl,
                //                 },
                //             },
                //         ],
                //     },
                // }),
                created_at: {
                    date: {
                        start: new Date().toISOString().slice(0, 10),
                    },
                },
            },
        });

        return { success: true, data: response };
    } catch (error) {
        console.error('Error updating News:', error);
        return { success: false, error: 'Failed to update News' };
    }
}
