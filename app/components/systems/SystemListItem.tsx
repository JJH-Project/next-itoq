'use client'

import { SystemPage } from '@/app/types/system';
import { getMessage } from '@/app/utils/messages';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react'

interface SystemListItemProps {
    item: SystemPage;
    onDelete: (id: string) => Promise<{ success: boolean } | { error: string }>;
}

export default function SystemListItem({ item, onDelete }: SystemListItemProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    // delete system
    const handleDelete = () => {
        startTransition(async () => {
            const result = await onDelete(item.id)
            if ('error' in result) {
                console.error('Failed to delete:', result.error)
            }
        })
    }

    return (
        <tr key={item.id}>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 border">
                {item.properties.title.title[0]?.plain_text || 'No title'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600 border">
                {item.properties.contents.rich_text[0]?.plain_text
                ? item.properties.contents.rich_text[0].plain_text.length > 30
                    ? `${item.properties.contents.rich_text[0].plain_text.substring(0, 30)}...`
                    : item.properties.contents.rich_text[0].plain_text
                : 'No contents'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-900 border">
                {item.properties.image?.rich_text[0]?.plain_text
                ? item.properties.image?.rich_text[0]?.plain_text.length > 30
                    ? `${item.properties.image?.rich_text[0]?.plain_text.substring(0, 30)}...`
                    : item.properties.image?.rich_text[0]?.plain_text
                : 'No image'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md font-medium flex justify-center gap-2">
                <button 
                    className="border border-gray-400 px-3 py-2 rounded-md hover:text-gray-400"
                    onClick={() => router.push(`/admin/system/${item.id}`)}
                >
                    {getMessage('common.edit')}
                </button>
                <button 
                    className="border border-red-400 text-red-600 px-3 py-2 rounded-md hover:text-red-400"
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    {isPending ? getMessage('common.deleting') + '...' : getMessage('common.delete')}
                </button>
            </td>
        </tr>
    )
} 