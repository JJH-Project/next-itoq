import { getBlogData, deleteBlogData } from '@/app/api/blog/blog';
import Link from 'next/link';
import type { BlogPage } from '@/app/types/blog';
import { revalidatePath } from 'next/cache';
import BlogListItem from '@/app/components/blog/BlogListItem';
import { getMessage } from '@/app/utils/messages';

export default async function AdminBlogPage() {
    // get data from notion
    const data = await getBlogData();

    // delete data from notion
    async function deleteBlog(id: string) {
        'use server';
        try {
            await deleteBlogData(id);
            revalidatePath('/admin/blog');
            return { success: true };
        } catch (error) {
            return { error: 'Failed to delete' };
        }
    }

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.blog')}</h1>
            <div className="my-5 flex justify-end">
                <Link
                    href="/admin/blog/create"
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
                                .filter((item): item is BlogPage => item !== undefined)
                                .map((item) => (
                                    <BlogListItem key={item.id} item={item} onDelete={deleteBlog} />
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
