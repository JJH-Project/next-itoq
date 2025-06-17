'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getNewsById, updateNews } from '@/app/api/news/news';
import NewsForm from '@/app/components/news/NewsForm';
import Swal from 'sweetalert2';

export default function AdminNewsEditPage({ params }: { params: Promise<{ id: string }> }) {
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
        const fetchNewsData = async () => {
            try {
                const news = await getNewsById(id);
                setInitialData({
                    title: news.title || '',
                    contents: news.contents || '',
                    // created_at: news.created_at || '',
                    // imageUrl: news.image || null,
                });
            } catch (error) {
                console.error('Error fetching news:', error);
                router.push('/admin/news');
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsData();
    }, [id, router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await updateNews(id, formData);
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
                    window.location.href = '/admin/news';
                }
            });
        } catch (error) {
            console.error('Error updating news:', error);
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
            <h1 className="mb-8 text-2xl font-bold">{getMessage('common.news')}編集</h1>
            <NewsForm
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
