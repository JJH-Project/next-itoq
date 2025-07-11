'use client';

import { getMessage } from '@/app/utils/messages';
import { useRouter } from 'next/navigation';
import { Viewer } from '@toast-ui/react-editor';
import PDFModal from '@/app/components/PDF/PDFModal';
import { useState } from 'react';

export default function BlogViewComponent({ data }: { data: any }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="container mx-auto px-5 py-24">
                <h2 className="title-font mb-8 text-center text-xl font-bold tracking-wider text-gray-900">
                    {data.title}
                </h2>
                <div className="mx-auto w-full text-center lg:w-3/4 xl:w-1/2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="mb-8 inline-block h-8 w-8 text-gray-400"
                        viewBox="0 0 975.036 975.036"
                    >
                        <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                    </svg>
                    <div className="mb-3 text-left text-lg">
                        <Viewer initialValue={data.contents} />
                    </div>
                    <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-indigo-500"></span>
                    <p className="text-gray-500">{data.created_at}</p>
                </div>
            </div>

            <div className="mx-auto flex w-full justify-end space-x-4 md:w-2/3 lg:w-1/2">
                {/* preview */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full rounded bg-gray-800 px-6 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
                >
                    {getMessage('common.preview')}
                </button>
                {/* back */}
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full rounded border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                    {getMessage('common.back')}
                </button>
            </div>
            <PDFModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={data.title}
                created_at={data.created_at}
                contents={data.contents}
            />
        </div>
    );
}
