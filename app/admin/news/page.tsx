import { getNewsData, deleteNewsData } from '@/app/api/news/news';
import Link from 'next/link';
import type { NewsPage } from '@/app/types/news';
import { revalidatePath } from 'next/cache';
import NewsListItem from '@/app/components/news/NewsListItem';
import { getMessage } from '@/app/utils/messages';

export default async function AdminNewsPage() {
    // get data from notion
    const data = await getNewsData();

    // delete data from notion
    async function deleteNews(id: string) {
        'use server';
        try {
            await deleteNewsData(id);
            revalidatePath('/admin/news');
            return { success: true };
        } catch (error) {
            return { error: 'Failed to delete' };
        }
    }

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.news')}</h1>
            <div className="my-5 flex justify-end">
                <Link
                    href="/admin/news/create"
                    className="rounded bg-gray-800 px-6 py-3 text-white hover:bg-opacity-90"
                >
                    {getMessage('common.create')}
                </Link>
            </div>

            <div className="mb-4">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 bg-gray-100 p-4 text-left font-semibold text-gray-900 dark:text-gray-200">
                                    Title
                                </th>
                                <th className="border border-gray-300 bg-gray-100 p-4 text-left font-semibold text-gray-900 dark:text-gray-200">
                                    Contents
                                </th>
                                <th className="w-1/6 border border-gray-300 bg-gray-100 p-4 text-left font-semibold text-gray-900 dark:text-gray-200"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {data
                                .filter((item): item is NewsPage => item !== undefined)
                                .map((item) => (
                                    <NewsListItem key={item.id} item={item} onDelete={deleteNews} />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
