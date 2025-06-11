'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMessage } from "../utils/messages";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        
        // check validation
        setError('');

        if (!email || email.trim() === '') {
            setEmailError(getMessage('validation.email.required'));
            return;
        } else {
            setEmailError('');
        }

        if (!password || password.trim() === '') {
            setPasswordError(getMessage('validation.password.required'));
            return;
        } else {
            setPasswordError('');
        }

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
            } else {
                router.push("/");
                router.refresh();
            }
        } catch (error) {
            setError(getMessage('common.error'));
        }
    };

    return (
        <div className="flex justify-center flex items-center mt-10">
            <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 bg-gray-50 w-full space-y-8 p-8 rounded-lg shadow">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    {getMessage('common.login')}
                </h2>
                <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-center text-sm">{error}</div>
                    )}
                    <div className="rounded-md shadow-sm">
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">
                                {getMessage('common.email')}
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="appearance-none rounded-none relative block w-full p-3  border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                                placeholder={getMessage('common.email')}
                            />
                            {emailError && (
                                <p className="mt-1 text-red-500">{emailError}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                {getMessage('common.password')}
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="appearance-none rounded-none relative block w-full p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                                placeholder={getMessage('common.password')}
                            />
                            {passwordError && (
                                <p className="mt-1 text-red-500">{passwordError}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                        type="submit"
                        className="group relative w-full flex justify-center bg-gray-800 text-white px-6 py-3 rounded hover:bg-opacity-90"
                        >
                            {getMessage('common.login')}
                        </button>
                    </div>
                </form>
                <div className=" font-medium text-gray-500 dark:text-gray-300">
                    Not registered? 
                    <Link href="/register" className="ml-4 text-blue-700 hover:underline dark:text-blue-800">
                        {getMessage('common.createAccount')}
                    </Link>
                </div>            
            </div>
        </div>
    );
}