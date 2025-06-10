'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getMessage } from "../utils/messages";
import Swal from "sweetalert2";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const role = "user" as string;

        const checkEmailUnique = async () => {
            try {
                const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
                const data = await res.json();
    
                return data.unique;
            } catch (error) {
                console.error('Error checking email:', error);
                setEmailError('エラーが発生しました');
            }
        };

        const isUnique = await checkEmailUnique();
        if (!isUnique) {
            setEmailError(getMessage('validation.email.unique'));
            return;
        } else {
            setEmailError('');
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify({ email, password, name, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                Swal.fire({
                    title: getMessage('common.errorTitle'),
                    text: getMessage('common.error'),
                    icon: 'error',
                    confirmButtonText: getMessage('common.errorConfirmButtonText'),
                    customClass: {
                        confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                    },
                });
            }

            Swal.fire({
                title: getMessage('common.successTitle'),
                text: getMessage('common.success'),
                icon: 'success',
                confirmButtonText: getMessage('common.successConfirmButtonText'),
                customClass: {
                    confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(getMessage('common.error'));
            }
        }
    };

    return (
        <div className="flex justify-center flex items-center mt-10">
            <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 bg-gray-50 w-full space-y-8 p-8 rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    {getMessage('common.register')}
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                    <div className="text-red-500 text-center text-sm">{error}</div>
                )}
                <div className="rounded-md shadow-sm">
                    <div className="mb-4">
                        <label htmlFor="name" className="sr-only">
                            {getMessage('common.name')}
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                            placeholder={getMessage('common.name')}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="sr-only">
                            {getMessage('common.email')}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                            placeholder={getMessage('common.email')}
                        />
                        {emailError && (
                            <p className="mt-1 text-red-500">{emailError}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="sr-only">
                            {getMessage('common.password')}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                            placeholder={getMessage('common.password')}
                        />
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center bg-gray-800 text-white px-6 py-3 rounded hover:bg-opacity-90"
                        >
                            {getMessage('common.register')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 