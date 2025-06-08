'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getSystemById, updateSystem } from '@/app/api/system/system';
import SystemForm from '@/app/components/systems/SystemForm';

export default function AdminSystemEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({
        title: '',
        contents: '',
        imageUrl: null as string | null
    });

    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const system = await getSystemById(id);
                setInitialData({
                    title: system.properties.title.title[0]?.plain_text || '',
                    contents: system.properties.contents.rich_text[0]?.plain_text || '',
                    imageUrl: system.properties.image?.rich_text[0]?.plain_text || null
                });
            } catch (error) {
                console.error('Error fetching system:', error);
                router.push('/admin/system');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSystemData();
    }, [id, router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await updateSystem(id, formData);
            if (result.success) {
                router.push('/admin/system');
            } else {
                console.error('Failed to update system:', result.error);
            }
        } catch (error) {
            console.error('Error updating system:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto p-8">
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
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.system')}編集</h1>
            <SystemForm
                initialTitle={initialData.title}
                initialContents={initialData.contents}
                initialImageUrl={initialData.imageUrl}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
} 