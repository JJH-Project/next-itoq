'use client'

import { ContactPage } from '@/app/types/contact';
import { getMessage } from '@/app/utils/messages';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react'
import { FORM_TITLE } from "@/app/utils/enums";

interface ContactListItemProps {
    item: ContactPage;
    onDelete: (id: string) => Promise<{ success: boolean } | { error: string }>;
}

export default function ContactListItem({ item, onDelete }: ContactListItemProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()

    // delete contact
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
                {FORM_TITLE[item.properties.formTitle.rich_text[0].plain_text as keyof typeof FORM_TITLE]}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-600 border">
                {item.properties.contents.rich_text[0]?.plain_text
                ? item.properties.contents.rich_text[0].plain_text.length > 30
                    ? `${item.properties.contents.rich_text[0].plain_text.substring(0, 30)}...`
                    : item.properties.contents.rich_text[0].plain_text
                : 'No contents'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-md font-medium flex justify-center gap-2">
                <button 
                    className="border text-gray-600 border-gray-400 px-3 py-2 rounded-md hover:text-gray-400"
                    onClick={() => router.push(`/admin/contact/${item.id}`)}
                >
                    {getMessage('common.view')}
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