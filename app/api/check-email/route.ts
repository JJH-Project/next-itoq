import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

// set notion
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const DATABASE_ID = process.env.NOTION_USER_DATABASE_ID;

// check email unique from notion user database
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const response = await notion.databases.query({
        database_id: DATABASE_ID!,
        filter: {
            property: 'email',
            rich_text: {
                equals: email!,
            },
        },
    });

    const isUnique = response.results.length === 0;

    return NextResponse.json({ unique: isUnique });
}
