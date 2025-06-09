'use client'

import { UserPage } from '@/app/types/user';
import { getMessage } from '@/app/utils/messages';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react'
import { ROLE_NAME, ROLE_STATUS } from "@/app/utils/enums";

interface UserListItemProps {
    item: UserPage;
    onDelete: (id: string) => Promise<{ success: boolean } | { error: string }>;
}

export default function UserListItem({ item, onDelete }: UserListItemProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    // delete user
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
                {item.properties.name.title[0].plain_text}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600 border">
                {item.properties.email.email}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600 border">
                {ROLE_NAME[item.properties.role.rich_text[0].plain_text as keyof typeof ROLE_NAME]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md font-medium flex justify-center gap-2">
                <button 
                    className="border text-blue-600 border-blue-400 px-3 py-2 rounded-md hover:text-blue-400"
                    onClick={() => router.push(`/admin/users/${item.id}`)}
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