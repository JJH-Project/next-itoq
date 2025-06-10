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
        contents: ''
    });

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const contact = await getContactById(id);
                setInitialData({
                    name: contact.properties.name.title[0]?.plain_text || '',
                    email: contact.properties.email.email || '',
                    formTitle: contact.properties.formTitle.rich_text[0]?.plain_text || '',
                    contents: contact.properties.contents.rich_text[0]?.plain_text || ''
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
            <div className="w-full  mx-auto p-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
                    <div className="space-y-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full  mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.contact')}詳細</h1>
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