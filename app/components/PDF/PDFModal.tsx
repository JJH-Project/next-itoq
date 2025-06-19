'use client';

import Modal from 'react-modal';
import { useEffect } from 'react';
import { marked } from 'marked';
import { getMessage } from '@/app/utils/messages';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    contents: string;
    created_at: string;
}

export default function PDFModal({ isOpen, onClose, title, contents, created_at }: Props) {
    useEffect(() => {
        Modal.setAppElement('body');
    }, []);
    const htmlContent = marked.parse(contents);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel={getMessage('common.preview')}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000,
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    height: '95%',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                },
            }}
        >
            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    PDF {getMessage('common.preview')}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.print()}
                        className="inline-flex items-center rounded bg-gray-800 px-6 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
                    >
                        {getMessage('common.print')}
                    </button>
                    <button
                        onClick={onClose}
                        className="inline-flex items-center rounded border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
                    >
                        <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {getMessage('common.close')}
                    </button>
                </div>
            </div>
            <div id="print-area" className="mx-auto w-full text-center lg:w-3/4 xl:w-1/2">
                <p className="title-font mb-8 text-center text-xl font-bold tracking-wider text-gray-900">
                    {title}
                </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="mb-8 inline-block h-8 w-8 text-gray-400"
                    viewBox="0 0 975.036 975.036"
                >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <div
                    className="mb-3 text-left text-lg"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
                <span className="mb-6 mt-8 inline-block h-1 w-10 rounded bg-indigo-500"></span>
                <p className="text-gray-500">{created_at}</p>
            </div>
        </Modal>
    );
}
