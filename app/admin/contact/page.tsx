import { getContactData, deleteContactData } from '@/app/api/contact/contact';
import { revalidatePath } from 'next/cache';
import ContactListItem from '@/app/components/contact/ContactListItem';
import { getMessage } from '@/app/utils/messages';
import type { ContactPage } from '@/app/types/contact';

export default async function AdminContactPage() {
    // get data from notion
    const data = await getContactData();

    // delete data from notion
    async function deleteContact(id: string) {
        'use server';
        try {
            await deleteContactData(id);
            revalidatePath('/admin/contact');
            return { success: true };
        } catch (error) {
            return { error: 'Failed to delete' };
        }
    }

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.contacts')}</h1>

            <div className="mb-4">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 bg-gray-100 p-4 text-left font-semibold text-gray-900 dark:text-gray-200">
                                    Name
                                </th>
                                <th className="border border-gray-300 bg-gray-100 p-4 text-left font-semibold text-gray-900 dark:text-gray-200">
                                    Email
                                </th>
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
                            {data.map((item: ContactPage) => (
                                <ContactListItem
                                    key={item.id}
                                    item={item}
                                    onDelete={deleteContact}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
