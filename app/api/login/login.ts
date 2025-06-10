'use server'

import { Client } from '@notionhq/client';
import bcrypt from 'bcryptjs';

// set notion
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_USER_DATABASE_ID;
// type LoginUser = {
//     id: string;
//     email: string;
//     name: string;
//     password: string;
// };

export async function fetchLoginUser(email: string, password: string) {
    try {
        console.log("#######################");
        const response = await notion.databases.query({
            database_id: DATABASE_ID!,
            filter: {
                property: 'email',
                rich_text: {
                    equals: email,
                },
            },
        });
        if (response.results.length === 0) {
            throw new Error('ユーザー情報がまちがっています'); // User not found
        }
    
        const user = response.results[0];
        console.log(user);
        return user;
        // const hashedPassword = user.properties.password.rich_text[0]?.plain_text || '';

        // const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

        // if (!isPasswordCorrect) {
        //     throw new Error('ユーザー情報がまちがっています'); // Wrong password
        // }
    
        // return {
        //     id: user.id,
        //     email: user.properties.email?.email || '',
        //     name: user.properties.name?.title?.[0]?.plain_text || '',
        // };
    } catch (err) {
        console.error('Failed to fetch user:', err);
        return null;
    }
}
