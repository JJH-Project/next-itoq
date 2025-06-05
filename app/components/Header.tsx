'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white px-6 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          My itoq
        </Link>

        {/* 햄버거 메뉴 버튼 */}
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

        {/* 데스크톱 메뉴 */}
        <div className="hidden space-x-4 md:flex">
          <Link href="/" className="hover:text-gray-600">
            Home
          </Link>
          <Link href="/todo" className="hover:text-gray-600">
            ToDo
          </Link>
          <Link href="/system" className="hover:text-gray-600">
            System
          </Link>
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
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
          <Link
            href="/contact"
            className="hover:text-gray-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
