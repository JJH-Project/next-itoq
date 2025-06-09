'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getUserById, updateUser } from '@/app/api/user/user';
import UserForm from '@/app/components/users/UserForm';

export default function AdminUserEditPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { id } = use(params);
    const [isLoading, setIsLoading] = useState(true);
    const [initialData, setInitialData] = useState({
        name: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserById(id);
                setInitialData({
                    name: user.properties.name.title[0]?.plain_text || '',
                    email: user.properties.email.email || '',
                    role: user.properties.role.rich_text[0]?.plain_text || ''
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                router.push('/account');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id, router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const result = await updateUser(id, formData);
            if (result.success) {
                router.push('/account');
            } else {
                console.error('Failed to update user:', result.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
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
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.account')}</h1>
            <UserForm
                initialName={initialData.name}
                initialEmail={initialData.email}
                initialRole={initialData.role}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit}
                onCancel={() => router.back()}
                isAccount={true}
            />
        </div>
    );
} 