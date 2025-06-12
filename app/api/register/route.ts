import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import bcrypt from 'bcryptjs';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_USER_DATABASE_ID;

// user register API
export async function POST(request: Request) {
    try {
        const { email, password, name, role } = await request.json();

        if (!email || !password || !name || !role) {
            return NextResponse.json({ error: 'フィールドを入力してください' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Notionにユーザーを作成
        const response = await notion.pages.create({
            parent: { database_id: DATABASE_ID! },
            properties: {
                email: {
                    email: email,
                },
                password: {
                    rich_text: [
                        {
                            text: {
                                content: hashedPassword,
                            },
                        },
                    ],
                },
                name: {
                    title: [
                        {
                            text: {
                                content: name,
                            },
                        },
                    ],
                },
                role: {
                    rich_text: [
                        {
                            text: {
                                content: role,
                            },
                        },
                    ],
                },
            },
        });

        return NextResponse.json({ message: 'success' }, { status: 201 });
    } catch (error) {
        console.error('error:', error);
        return NextResponse.json({ error: 'error' }, { status: 500 });
    }
}
