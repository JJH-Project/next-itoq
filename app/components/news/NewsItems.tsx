'use client';

import { Viewer } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { Scope_One } from 'next/font/google';
import Link from 'next/link';

const ToastViewer = dynamic(() => import('@toast-ui/react-editor').then((mod) => mod.Viewer), {
    ssr: false,
});

export default function NewsItems({ data }: { data: any }) {
    return (
        <div className="p-4 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <div className="relative h-full overflow-hidden rounded-lg bg-gray-100 bg-opacity-75 px-8 py-16 text-center">
                <h2 className="title-font mb-1 text-xs font-medium tracking-widest text-gray-400">
                    NEWS
                </h2>
                <h1 className="title-font mb-3 text-xl font-medium text-gray-900 sm:text-2xl">
                    {data.title}
                </h1>
                <div className="mb-3 whitespace-pre-wrap text-left leading-relaxed">
                    <ToastViewer initialValue={data.contents} />
                </div>
                <Link
                    href={`/news/${data.id}`}
                    className="inline-flex items-center text-indigo-500"
                >
                    Learn More
                    <svg
                        className="ml-2 h-4 w-4"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </Link>
            </div>
            <style jsx>{`
                .whitespace-pre-wrap {
                    height: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
