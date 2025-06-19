'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getMessage } from '@/app/utils/messages';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const { data: session, status } = useSession();

    return (
        <header className="w-full border-b bg-gray-800 px-6 py-4 text-white">
            <nav className="mx-auto flex w-full items-center justify-between">
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
                    <Link href="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/system" className="hover:text-gray-300">
                        {getMessage('common.system')}
                    </Link>
                    <Link href="/blog" className="hover:text-gray-300">
                        {getMessage('common.blog')}
                    </Link>
                    <Link href="/contact" className="hover:text-gray-300">
                        {getMessage('common.contact')}
                    </Link>
                    {session && (
                        <Link
                            href={`/account/${session.user?.id}/edit`}
                            className="hover:text-gray-300"
                        >
                            {getMessage('common.account')}
                        </Link>
                    )}
                    {session && (session.user as any)?.role === 'admin' && (
                        <div className="relative z-10">
                            <button
                                onClick={() => setIsAdminOpen(!isAdminOpen)}
                                className="flex items-center hover:text-gray-300"
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
                                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Link
                                            href="/admin/system"
                                            className="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsAdminOpen(false)}
                                        >
                                            {getMessage('common.systems')}
                                        </Link>
                                        <Link
                                            href="/admin/users"
                                            className="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsAdminOpen(false)}
                                        >
                                            {getMessage('common.users')}
                                        </Link>
                                        <Link
                                            href="/admin/blog"
                                            className="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsAdminOpen(false)}
                                        >
                                            {getMessage('common.blog')}管理
                                        </Link>
                                        <Link
                                            href="/admin/contact"
                                            className="text-md block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsAdminOpen(false)}
                                        >
                                            {getMessage('common.contacts')}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!session && (
                        <Link
                            href="/login"
                            className="inline-block rounded-full bg-white px-3 py-1 text-gray-600"
                        >
                            {getMessage('common.login')}
                        </Link>
                    )}
                    {session && (
                        <button
                            className="inline-block rounded-full bg-white px-2 py-1 text-gray-600"
                            onClick={() => signOut({ callbackUrl: '/login' })}
                        >
                            {getMessage('common.logout')}
                        </button>
                    )}
                </div>

                {/* mobile menu */}
                <div
                    className={`${
                        isMenuOpen ? 'flex' : 'hidden'
                    } absolute left-0 right-0 top-16 z-10 flex-col space-y-4 border-b bg-gray-800 p-4 text-white md:hidden`}
                >
                    <Link href="/" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/system" onClick={() => setIsMenuOpen(false)}>
                        {getMessage('common.system')}
                    </Link>
                    <Link href="/blog" className="hover:text-gray-300">
                        {getMessage('common.blog')}
                    </Link>
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                        {getMessage('common.contact')}
                    </Link>
                    {session && (
                        <Link
                            href={`/account/${session.user?.id}/edit`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {getMessage('common.account')}
                        </Link>
                    )}
                    {session && (session.user as any)?.role === 'admin' && (
                        <div className="space-y-4">
                            <div className="font-medium">Admin</div>
                            <div className="space-y-4 pl-4">
                                <Link
                                    href="/admin/system"
                                    className="block hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {getMessage('common.systems')}
                                </Link>
                                <Link
                                    href="/admin/blog"
                                    className="block hover:text-gray-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {getMessage('common.blog')}管理
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
                    )}
                    {!session && (
                        <Link
                            onClick={() => setIsMenuOpen(false)}
                            href="/login"
                            className="mx-auto inline-block w-full rounded-full bg-white px-3 py-1 text-center text-gray-600 sm:w-[300px]"
                        >
                            {getMessage('common.login')}
                        </Link>
                    )}
                    {session && (
                        <button
                            className="mx-auto inline-block w-full rounded-full bg-white px-2 py-1 text-gray-600 sm:w-[300px]"
                            onClick={() => signOut({ callbackUrl: '/login' })}
                        >
                            {getMessage('common.logout')}
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
}
