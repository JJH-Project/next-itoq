'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { SessionProvider } from 'next-auth/react';
import '@toast-ui/editor/dist/toastui-editor.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <SessionProvider>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-grow p-8">{children}</main>
                        <Footer />
                    </div>
                </SessionProvider>
            </body>
        </html>
    );
}
