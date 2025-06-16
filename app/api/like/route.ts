import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const LIKES_DATABASE_ID = process.env.NOTION_LIKES_DATABASE_ID;

export async function POST(req: Request) {
    try {
        const { systemId } = await req.json();

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const userId = session.user?.id;

        // ユーザーがいいねしているかどうかを判定するため
        const existing = await notion.databases.query({
            database_id: LIKES_DATABASE_ID!,
            filter: {
                and: [
                    { property: 'user_id', rich_text: { equals: userId } },
                    { property: 'system_id', rich_text: { equals: systemId } },
                ],
            },
        });

        // すでにいいねしている場合ユーザーを削除する
        if (existing.results.length > 0) {
            await notion.pages.update({
                page_id: existing.results[0].id,
                archived: true,
            });
            return NextResponse.json({ liked: false });
        } else {
            await notion.pages.create({
                parent: { database_id: LIKES_DATABASE_ID! },
                properties: {
                    user_id: { title: [{ text: { content: userId ?? '' } }] },
                    system_id: { rich_text: [{ text: { content: systemId } }] },
                },
            });
            return NextResponse.json({ liked: true });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
