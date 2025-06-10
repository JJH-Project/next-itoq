'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { createSystem } from '@/app/api/system/system';
import SystemForm from '@/app/components/systems/SystemForm';
import Swal from 'sweetalert2';

export default function AdminSystemCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await createSystem(formData);
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

            router.push('/admin/system');

        } catch (error) {
            console.error('Error creating system:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full  mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.system')}作成</h1>
            <SystemForm
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
            />
        </div>
    );
} 