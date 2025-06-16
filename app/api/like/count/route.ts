import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const LIKES_DATABASE_ID = process.env.NOTION_LIKES_DATABASE_ID;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const systemId = searchParams.get('systemId');

    const res = await notion.databases.query({
        database_id: LIKES_DATABASE_ID!,
        filter: {
            property: 'system_id',
            rich_text: { equals: systemId! },
        },
    });
    return NextResponse.json({ count: res.results.length });
}
