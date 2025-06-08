import { getUserData, deleteUserData } from '@/app/api/user/user'
import Link from 'next/link'
import type { NotionUserPage } from '@/app/api/user/user'
import { revalidatePath } from 'next/cache'
import UserListItem from '@/app/components/users/UserListItem'
import { getMessage } from '@/app/utils/messages'

export default async function AdminUserPage() {
    // get data from notion
    const data = await getUserData();

    // delete data from notion
    async function deleteUser(id: string) {
        'use server'
        try {
            await deleteUserData(id)
            revalidatePath('/admin/user')
            return { success: true }
        } catch (error) {
            return { error: 'Failed to delete' }
        }
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.user')}</h1>
            <div className="flex justify-end my-5">
                <Link 
                    href="/admin/user/create" 
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
                            {data.map((item: NotionUserPage) => (
                                <UserListItem 
                                    key={item.id} 
                                    item={item}
                                    onDelete={deleteUser}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
} 