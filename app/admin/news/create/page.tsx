'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { createNews } from '@/app/api/news/news';
import NewsForm from '@/app/components/news/NewsForm';
import Swal from 'sweetalert2';

export default function AdminNewsCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await createNews(formData);
            console.log('response', response);
            if (!response.success) {
                Swal.fire({
                    title: getMessage('common.errorTitle'),
                    text: getMessage('common.errorSave'),
                    icon: 'error',
                    confirmButtonText: getMessage('common.errorConfirmButtonText'),
                    customClass: {
                        confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                    },
                });
                return;
            }

            router.push('/admin/news');
        } catch (error) {
            console.error('Error creating news:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.news')}作成</h1>
            <NewsForm
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
}
