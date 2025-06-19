'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getContactById } from '@/app/api/contact/contact';
import ContactForm from '@/app/components/contact/ContactForm';

export default function AdminContactViewPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({
        name: '',
        email: '',
        formTitle: '',
        contents: '',
    });

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const contact = await getContactById(id);
                setInitialData({
                    name: contact.properties.name.title[0]?.plain_text || '',
                    email: contact.properties.email.email || '',
                    formTitle: contact.properties.formTitle.rich_text[0]?.plain_text || '',
                    contents: contact.properties.contents.rich_text[0]?.plain_text || '',
                });
            } catch (error) {
                console.error('Error fetching contact:', error);
                router.push('/admin/contact');
            } finally {
                setIsLoading(false);
            }
        };

        fetchContactData();
    }, [id, router]);

    if (isLoading) {
        return (
            <div className="mx-auto w-full p-8">
                <div className="animate-pulse">
                    <div className="mb-8 h-8 w-1/4 rounded bg-gray-200"></div>
                    <div className="space-y-6">
                        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                        <div className="h-10 rounded bg-gray-200"></div>
                        <div className="h-4 w-1/4 rounded bg-gray-200"></div>
                        <div className="h-32 rounded bg-gray-200"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.contact')}詳細</h1>
            <ContactForm
                initialName={initialData.name}
                initialEmail={initialData.email}
                initialFormTitle={initialData.formTitle}
                initialContents={initialData.contents}
                onCancel={() => router.back()}
            />
        </div>
    );
}
