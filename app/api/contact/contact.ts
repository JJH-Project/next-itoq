'use server';

import { Client } from '@notionhq/client';
import type { ContactPage } from '@/app/types/contact';
import { FORM_TITLE } from '@/app/utils/enums';

// set notion
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});
const DATABASE_ID = process.env.NOTION_CONTACT_DATABASE_ID;

// get contact data
export async function getContactData() {
    try {
        const response = await notion.databases.query({
            database_id: DATABASE_ID!,
        });

        return response.results.map((page) => {
            if ('properties' in page) {
                return {
                    id: page.id,
                    properties: {
                        name: page.properties.name as ContactPage['properties']['name'],
                        email: page.properties.email as ContactPage['properties']['email'],
                        formTitle: page.properties
                            .form_title as ContactPage['properties']['formTitle'],
                        contents: page.properties.contents as ContactPage['properties']['contents'],
                    },
                };
            }
            throw new Error('Invalid page format');
        });
    } catch (error) {
        console.error('Error fetching contact data:', error);
        return [];
    }
}

// send contact
export async function sendContact(data: {
    name: string;
    email: string;
    contents: string;
    form_title: string;
}) {
    try {
        if (!DATABASE_ID) {
            throw new Error('Database ID is not configured');
        }

        if (!process.env.NOTION_TOKEN) {
            throw new Error('Notion token is not configured');
        }

        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID! },
            properties: {
                name: {
                    title: [
                        {
                            text: {
                                content: data.name,
                            },
                        },
                    ],
                },
                email: {
                    email: data.email,
                },
                contents: {
                    rich_text: [
                        {
                            text: {
                                content: data.contents,
                            },
                        },
                    ],
                },
                form_title: {
                    rich_text: [
                        {
                            text: {
                                content: data.form_title,
                            },
                        },
                    ],
                },
            },
        });

        console.log('Notion response:', response);
        return { success: true, data: response };
    } catch (error) {
        console.error('Detailed error:', error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Failed to send contact' };
    }
}

// delete contact
export async function deleteContactData(id: string) {
    try {
        await notion.pages.update({
            page_id: id,
            archived: true,
        });
        return { success: true };
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
}

// get contact by id
export async function getContactById(id: string) {
    try {
        const response = await notion.pages.retrieve({
            page_id: id,
        });

        if ('properties' in response) {
            return {
                id: response.id,
                properties: {
                    name: response.properties.name as ContactPage['properties']['name'],
                    email: response.properties.email as ContactPage['properties']['email'],
                    formTitle: response.properties
                        .form_title as ContactPage['properties']['formTitle'],
                    contents: response.properties.contents as ContactPage['properties']['contents'],
                },
            };
        }
        throw new Error('Invalid page format');
    } catch (error) {
        console.error('Error fetching contact:', error);
        throw error;
    }
}

export async function getContactChart() {
    const data = await getContactData();
    const resetData = Object.fromEntries(Object.keys(FORM_TITLE).map((key) => [key, 0]));

    data.forEach((item) => {
        const formTitle = item.properties.formTitle.rich_text[0].plain_text;
        resetData[formTitle] = resetData[formTitle] + 1;
    });
    const result = Object.entries(resetData).map(([title, total]) => ({
        label: title,
        value: total,
    }));

    return result;
}
