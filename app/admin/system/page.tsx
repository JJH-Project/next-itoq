import { getSystemData, deleteSystemData } from '@/app/api/system/system'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import SystemListItem from '@/app/components/systems/SystemListItem'
import { getMessage } from '@/app/utils/messages'

export default async function AdminSystemPage() {
    // get data from notion
    const data = await getSystemData();

    // delete data from notion
    async function deleteSystem(id: string) {
        'use server'
        try {
            await deleteSystemData(id)
            revalidatePath('/admin/system')
            return { success: true }
        } catch (error) {
            return { error: 'Failed to delete' }
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.system')}</h1>
            <div className="flex justify-end my-5">
                <Link 
                    href="/admin/system/create" 
                    className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-opacity-90"
                >
                    {getMessage('common.create')}
                </Link>
            </div>

            <div className="mb-4">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:text-gray-200 bg-gray-100">Title</th>
                                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:text-gray-200 bg-gray-100">Contents</th>
                                <th className="border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:text-gray-200 bg-gray-100">Image</th>
                                <th className="w-1/6 border border-gray-300 p-4 text-left font-semibold text-gray-900 dark:text-gray-200 bg-gray-100"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item) => (
                                <SystemListItem 
                                    key={item.id} 
                                    item={item}
                                    onDelete={deleteSystem}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 