'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { createSystem } from '@/app/api/system/system';
import SystemForm from '@/app/components/systems/SystemForm';

export default function AdminSystemCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await createSystem(formData);
            if (result.success) {
                router.push('/admin/system');
            } else {
                console.error('Failed to create system:', result.error);
            }
        } catch (error) {
            console.error('Error creating system:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.system')}作成</h1>
            <SystemForm
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
} 