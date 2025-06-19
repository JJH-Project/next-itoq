'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { createBlog } from '@/app/api/blog/blog';
import BlogForm from '@/app/components/blog/BlogForm';
import Swal from 'sweetalert2';

export default function AdminBlogCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await createBlog(formData);
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

            router.push('/admin/blog');
        } catch (error) {
            console.error('Error creating blog:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto w-full">
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.blog')}作成</h1>
            <BlogForm
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
}
