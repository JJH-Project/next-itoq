'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getMessage } from '@/app/utils/messages';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);

    return (
        <header className="w-full border-b bg-white px-6 py-4">
            <nav className="mx-auto flex max-w-7xl items-center justify-between">
                <Link href="/" className="text-xl font-bold">
                    My itoq
                </Link>

                <button
                    className="p-2 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="menu"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                        ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        )}
                    </svg>
                </button>

                <div className="hidden space-x-4 md:flex">
                    <Link href="/" className="hover:text-gray-600">
                        Home
                    </Link>
                    <Link href="/system" className="hover:text-gray-600">
                        {getMessage('common.system')}
                    </Link>
                    <Link href="/contact" className="hover:text-gray-600">
                        {getMessage('common.contact')}
                    </Link>
                    <Link href="/account" className="hover:text-gray-600">
                        {getMessage('common.account')}
                    </Link>
                    <Link href="/login" className="hover:text-gray-600">
                        {getMessage('common.login')}
                    </Link>
                    <div className="relative">
                        <button
                            onClick={() => setIsAdminOpen(!isAdminOpen)}
                            className="hover:text-gray-600 flex items-center"
                        >
                            Admin
                            <svg
                                className={`ml-1 h-4 w-4 transition-transform ${
                                isAdminOpen ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isAdminOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    <Link
                                        href="/admin/system"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        {getMessage('common.systems')}
                                    </Link>
                                    <Link
                                        href="/admin/users"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        {getMessage('common.users')}
                                    </Link>
                                    <Link
                                        href="/admin/contact"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        {getMessage('common.contact')}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* mobile menu */}
                <div
                    className={`${
                    isMenuOpen ? 'flex' : 'hidden'
                    } absolute top-16 right-0 left-0 flex-col space-y-4 border-b bg-white p-4 md:hidden`}
                >
                    <Link href="/" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/system" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                        {getMessage('common.system')}
                    </Link>
                    <Link href="/contact" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                        {getMessage('common.contact')}
                    </Link>
                    <Link href="/account" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                        {getMessage('common.account')}
                    </Link>
                    <div className="space-y-2">
                        <div className="font-medium">Admin</div>
                        <div className="pl-4 space-y-2">
                            <Link
                                href="/admin/system"
                                className="block hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {getMessage('common.systems')}
                            </Link>
                            <Link
                                href="/admin/users"
                                className="block hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {getMessage('common.users')}
                            </Link>
                            <Link
                                href="/admin/contact"
                                className="block hover:text-gray-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {getMessage('common.contacts')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
