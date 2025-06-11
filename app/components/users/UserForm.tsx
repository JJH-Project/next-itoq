'use client';

import { Client } from '@notionhq/client';
import { useState } from 'react';
import { getMessage } from '@/app/utils/messages';
import { ROLE_NAME } from '@/app/utils/enums';

interface UserFormProps {
    initialName?: string;
    initialEmail?: string;
    initialRole?: string;
    isSubmitting: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
    isEdit?: boolean;
    isCreate?: boolean;
    isAccount?: boolean;
}

export default function UserForm({
    initialName = '',
    initialEmail = '',
    initialRole = 'user',
    isSubmitting,
    onSubmit,
    onCancel,
    isEdit = false,
    isCreate = false,
    isAccount = false,
}: UserFormProps) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [role, setRole] = useState(initialRole);
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    // set notion
    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check validation
        if (!email) {
            setEmailError(getMessage('validation.email.required'));
            return;
        } 
        if (email && isCreate) {
            const isUnique = await checkEmailUnique();
            if (!isUnique) {
                setEmailError(getMessage('validation.email.unique'));
                return;
            } else {
                setEmailError('');
            }
        }
                
        if (!name || name.trim() === '') {
            setNameError(getMessage('validation.name.required'));
            return;
        }
        if (!password && isCreate) {
            setPasswordError(getMessage('validation.password.required'));
            return;
        }
        if (password && isCreate) {
            const passwordRule =
                /^(?=.*[a-zA-Z])(?=.*[\d\W_]).{8,}$/;
        
            if (!passwordRule.test(password)) {
                setPasswordError(getMessage('validation.password.rule')); 
                return;
            }
        }
        if (!role && !isAccount) {
            setRoleError(getMessage('validation.role.required'));
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('role', role);
        if (isCreate) {
            formData.append('password', password);
        }

        await onSubmit(formData);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setName(newName);
        setNameError(null);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailError(null);
    };

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

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        setRole(newRole);
        setRoleError(null);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordError(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            <div className="border-gray-200 rounded-lg shadow-sm bg-gray-50 p-8">
                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.email')}
                        <span className="text-red-500 text-xl"> *</span>
                    </div>
                    {!isAccount && <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isEdit}
                    />}
                    {isAccount && <p className="text-gray-800 pb-6 border-b">{email}</p>}
                    {emailError && (
                        <p className="mt-1 text-red-500">{emailError}</p>
                    )}
                </div>
                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.name')}
                        <span className="text-red-500 text-xl"> *</span>
                    </div>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {nameError && (
                        <p className="mt-1 text-red-500">{nameError}</p>
                    )}
                </div>
                {isCreate && (
                    <div className="relative mb-4">
                        <div className="leading-7 text-gray-800 font-bold mb-2">
                            {getMessage('common.password')}
                            <span className="text-red-500 text-xl"> *</span>
                        </div>
                        <input
                            type="text"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {passwordError && (
                            <p className="mt-1 text-red-500">{passwordError}</p>
                        )}
                    </div>
                )}
                <div className="relative mb-4">
                    <div className="leading-7 text-gray-800 font-bold mb-2">
                        {getMessage('common.role')}
                        <span className="text-red-500 text-xl"> *</span>
                    </div>
                    {!isAccount && (
                        <select
                            name="role"
                            value={role}
                            onChange={handleRoleChange}
                            className="w-full p-4  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {Object.entries(ROLE_NAME).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    )}
                    {isAccount && (
                        <p className="text-gray-800 pb-6 ">{ROLE_NAME[role as keyof typeof ROLE_NAME]}</p>
                    )}
                    {roleError && (
                        <p className="mt-1 text-red-500">{roleError}</p>
                    )}
                </div>
            </div>
            <div className="flex justify-end space-x-4 w-full sm:w-1/2 mx-auto">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                    {getMessage('common.back')}
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                    {isSubmitting ? getMessage('common.saving') : getMessage('common.save')}
                </button>
            </div>
        </form>
    );
} 