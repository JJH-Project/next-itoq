'use client';

import { useState } from 'react';
import { sendContact } from '@/app/api/contact/contact';
import { FORM_TITLE } from '@/app/utils/enums';
import { getMessage } from '@/app/utils/messages';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function ContactPage() {
    const router = useRouter();
    const session = useSession();
    const [name, setName] = useState(session.data?.user?.name || '');
    const [email, setEmail] = useState(session.data?.user?.email || '');
    const [error, setError] = useState<string | null>(null);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [formTitleError, setFormTitleError] = useState<string | null>(null);
    const [contentsError, setContentsError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setNameError(null);
        setEmailError(null);
        setFormTitleError(null);
        setContentsError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            contents: formData.get('contents') as string,
            form_title: formData.get('form_title') as string,
        };

        // Validation
        if (!data.name || data.name.trim() === '') {
            setNameError(getMessage('validation.name.required'));
            setIsSubmitting(false);
            return;
        }

        if (!data.email || data.email.trim() === '') {
            setEmailError(getMessage('validation.email.required'));
            setIsSubmitting(false);
            return;
        }

        if (!data.form_title || data.form_title.trim() === '') {
            setFormTitleError(getMessage('validation.formTitle.required'));
            setIsSubmitting(false);
            return;
        }

        if (!data.contents || data.contents.trim() === '') {
            setContentsError(getMessage('validation.contents.required'));
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await sendContact(data);
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
                text: getMessage('common.successSend'),
                icon: 'success',
                customClass: {
                    confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/';
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send contact');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full  mx-auto">
            <h1 className="text-2xl font-bold mb-8">{getMessage('common.contact')}</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6  w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.name')}
                    </div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {nameError && <p className="mt-1 text-red-500">{nameError}</p>}
                </div>

                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.email')}
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emailError && <p className="mt-1 text-red-500">{emailError}</p>}
                </div>

                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.formTitle')}
                    </div>
                    <select
                        name="form_title"
                        id="form_title"
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Object.entries(FORM_TITLE).map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                        ))}
                    </select>
                    {formTitleError && <p className="mt-1 text-red-500">{formTitleError}</p>}
                </div>

                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.contents')}
                    </div>
                    <textarea
                        name="contents"
                        id="contents"
                        rows={4}
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {contentsError && <p className="mt-1 text-red-500">{contentsError}</p>}
                </div>

                <div className="flex justify-end space-x-4 w-full sm:w-1/2 mx-auto">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                    >
                        {isSubmitting ? getMessage('common.sending') : getMessage('common.send')}
                    </button>
                </div>
            </form>
        </div>
    );
}