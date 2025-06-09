'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { createUser } from '@/app/api/user/user';
import UserForm from '@/app/components/users/UserForm';

export default function AdminUserCreatePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await createUser(formData);
            if (result.success) {
                router.push('/admin/users');
            } else {
                console.error('Failed to create user:', result.error);
            }
        } catch (error) {
            console.error('Error creating user:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.user')}作成</h1>
            <UserForm
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                isCreate={true}
            />
        </div>
    );
} 