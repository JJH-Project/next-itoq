'use server'

import { Client } from '@notionhq/client';
import { v2 as cloudinary } from 'cloudinary';
import type { UserPage } from '@/app/types/user';

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

const DATABASE_ID = process.env.NOTION_USER_DATABASE_ID;

// get user data
export async function getUserData() {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID!,
        });
        
        return response.results.map((page) => {
            if ('properties' in page) {
                return {
                    id: page.id,
                    properties: {
                        name: page.properties.name as UserPage['properties']['name'],
                        email: page.properties.email as UserPage['properties']['email'],
                        role: page.properties.role as UserPage['properties']['role']
                    }
                }
            }
            throw new Error('Invalid page format')
        })
    } catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}

// create user
export const createUser = async (formData: FormData) => {
    try {
        const name = formData.get('name')?.toString() || ''
        const email = formData.get('email')?.toString() || ''
        const role = formData.get('role')?.toString() || ''
        const password = formData.get('password')?.toString() || ''

        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID! },
            properties: {
                name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                email: {
                    email: email
                },
                role: {
                    rich_text: [
                        {
                            text: {
                                content: role
                            }
                        }
                    ]
                },
                password: {
                    rich_text: [
                        {
                            text: {
                                content: password
                            }
                        }
                    ]
                }
            }
        })

        return { success: true, data: response }
    } catch (error) {
        console.error('Error creating user:', error)
        return { success: false, error: 'Failed to create user' }
    }
}

// delete user
export async function deleteUserData(id: string) {
    try {
        await notion.pages.update({
            page_id: id,
            archived: true,
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// get user by id
export async function getUserById(id: string) {
    try {
        const response = await notion.pages.retrieve({
            page_id: id,
        });

        if ('properties' in response) {
            return {
                id: response.id,
                properties: {
                    name: response.properties.name as UserPage['properties']['name'],
                    email: response.properties.email as UserPage['properties']['email'],
                    role: response.properties.role as UserPage['properties']['role']
                }
            };
        }
        throw new Error('Invalid page format');
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

// update user
export async function updateUser(id: string, formData: FormData) {
    try {
        const name = formData.get('name')?.toString() || ''
        const email = formData.get('email')?.toString() || ''
        const role = formData.get('role')?.toString() || ''

        const response = await notion.pages.update({
            page_id: id,
            properties: {
                name: {
                    title: [
                        {
                            text: {
                                content: name
                            }
                        }
                    ]
                },
                email: {
                    email: email
                },
                role: {
                    rich_text: [
                        {
                            text: {
                                content: role
                            }
                        }
                    ]
                }
            }
        })

        return { success: true, data: response }
    } catch (error) {
        console.error('Error updating user:', error)
        return { success: false, error: 'Failed to update user' }
    }
}
