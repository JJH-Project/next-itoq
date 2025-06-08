'use client';

import Link from 'next/link';
import { useState } from 'react';

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
                        System
                    </Link>
                    <Link href="/contact" className="hover:text-gray-600">
                        Contact
                    </Link>
                    <Link href="/mypage" className="hover:text-gray-600">
                        Mypage
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
                                        href="/admin/users"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        Users管理
                                    </Link>
                                    <Link
                                        href="/admin/system"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        System管理
                                    </Link>
                                    <Link
                                        href="/admin/contact"
                                        className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsAdminOpen(false)}
                                    >
                                        Contact管理
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 모바일 메뉴 */}
                <div
                className={`${
                    isMenuOpen ? 'flex' : 'hidden'
                } absolute top-16 right-0 left-0 flex-col space-y-4 border-b bg-white p-4 md:hidden`}
                >
                <Link href="/" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                    Home
                </Link>
                <Link href="/todo" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                    ToDo
                </Link>
                <Link href="/system" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                    System
                </Link>
                <Link href="/contact" className="hover:text-gray-600" onClick={() => setIsMenuOpen(false)}>
                    Contact
                </Link>
                <div className="space-y-2">
                    <div className="font-medium">Admin</div>
                    <div className="pl-4 space-y-2">
                    <Link
                        href="/admin"
                        className="block hover:text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        대시보드
                    </Link>
                    <Link
                        href="/admin/system"
                        className="block hover:text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        시스템 관리
                    </Link>
                    <Link
                        href="/admin/users"
                        className="block hover:text-gray-600"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        사용자 관리
                    </Link>
                    </div>
                </div>
                </div>
            </nav>
        </header>
    );
}
