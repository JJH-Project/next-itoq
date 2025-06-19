'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getBlogById, updateBlog } from '@/app/api/blog/blog';
import BlogForm from '@/app/components/blog/BlogForm';
import Swal from 'sweetalert2';

export default function AdminBlogEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({
        title: '',
        contents: '',
        // created_at: '',
    });

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const blog = await getBlogById(id);
                setInitialData({
                    title: blog.title || '',
                    contents: blog.contents || '',
                });
            } catch (error) {
                console.error('Error fetching blog:', error);
                router.push('/admin/blog');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogData();
    }, [id, router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await updateBlog(id, formData);
            if (!response.success) {
                Swal.fire({
                    title: getMessage('common.errorTitle'),
                    text: getMessage('common.errorFetch'),
                    icon: 'error',
                    confirmButtonText: getMessage('common.errorConfirmButtonText'),
                    customClass: {
                        confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                    },
                });
            }

            Swal.fire({
                title: getMessage('common.successTitle'),
                text: getMessage('common.successSave'),
                icon: 'success',
                customClass: {
                    confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/admin/blog';
                }
            });
        } catch (error) {
            console.error('Error updating blog:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.blog')}編集</h1>
            <BlogForm
                initialTitle={initialData.title}
                initialContents={initialData.contents}
                // initialImageUrl={initialData.imageUrl}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
}
