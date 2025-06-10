'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getMessage } from '@/app/utils/messages';
import { getUserById, updateUser } from '@/app/api/user/user';
import UserForm from '@/app/components/users/UserForm';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
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
    const { data: session } = useSession();

    useEffect(() => {
        if (!id || id === '') {
            router.push('/login');
        }
        if (id !== session?.user?.id) {
            router.push('/');
        }

        const fetchUserData = async () => {
            try {
                const user = await getUserById(id);
                setInitialData({
                    name: user.properties.name.title[0]?.plain_text || '',
                    email: user.properties.email.email || '',
                    role: user.properties.role.rich_text[0]?.plain_text || ''
                });
            } catch (error) {
                Swal.fire({
                    title: getMessage('common.errorTitle'),
                    text: getMessage('common.errorFetch'),
                    icon: 'error',
                    confirmButtonText: getMessage('common.errorConfirmButtonText'),
                    customClass: {
                        confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id, router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await updateUser(id, formData);
            if (!response.success) {
                throw new Error(response.error || 'Failed to save user');
            }
            Swal.fire({
                title: getMessage('common.successTitle'),
                text: getMessage('common.successSave'),
                icon: 'success',
                customClass: {
                    confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                },
            });
        } catch (error) {
            Swal.fire({
                title: getMessage('common.errorTitle'),
                text: getMessage('common.errorFetch'),
                icon: 'error',
                confirmButtonText: getMessage('common.errorConfirmButtonText'),
                customClass: {
                    confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                },
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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