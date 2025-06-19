'use client';

import { BlogPage } from '@/app/types/blog';
import { getMessage } from '@/app/utils/messages';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

interface BlogListItemProps {
    item: BlogPage;
    onDelete: (id: string) => Promise<{ success: boolean } | { error: string }>;
}

export default function BlogListItem({ item, onDelete }: BlogListItemProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // delete blog
    const handleDelete = () => {
        startTransition(async () => {
            const result = await onDelete(item.id);
            if ('error' in result) {
                console.error('Failed to delete:', result.error);
            }
        });
    };

    return (
        <tr key={item.id}>
            <td className="text-md whitespace-nowrap border px-6 py-4 text-gray-900">
                {item.title || 'No title'}
            </td>
            <td className="text-md whitespace-nowrap border px-6 py-4 text-gray-600">
                {item.contents
                    ? item.contents.length > 30
                        ? `${item.contents.substring(0, 30)}...`
                        : item.contents
                    : 'No contents'}
            </td>
            <td className="text-md flex justify-center gap-2 whitespace-nowrap px-6 py-4 font-medium">
                <button
                    className="rounded-md border border-blue-400 px-3 py-2 text-blue-600 hover:text-blue-600"
                    onClick={() => router.push(`/admin/blog/${item.id}/edit`)}
                >
                    {getMessage('common.edit')}
                </button>
                <button
                    className="rounded-md border border-red-400 px-3 py-2 text-red-600 hover:text-red-400"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending
                        ? getMessage('common.deleting') + '...'
                        : getMessage('common.delete')}
                </button>
            </td>
        </tr>
    );
}
