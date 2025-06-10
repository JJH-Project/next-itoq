'use client';

import { Client } from '@notionhq/client';
import { useState } from 'react';
import { getMessage } from '@/app/utils/messages';
import { FORM_TITLE } from '@/app/utils/enums';

interface ContactFormProps {
    initialName?: string;
    initialEmail?: string;
    initialFormTitle?: string;
    initialContents?: string;
    onCancel: () => void;
}

export default function ContactForm({
    initialName = '',
    initialEmail = '',
    initialFormTitle = '',
    initialContents = '',
    onCancel,
}: ContactFormProps) {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [formTitle, setFormTitle] = useState(initialFormTitle);
    const [contents, setContents] = useState(initialContents);

    // set notion
    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    });

    return (
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto -my-8 divide-y-2 divide-gray-100">
            <div className="py-8 md:flex flex-wrap md:flex-nowrap">
                <div className="font-semibold md:w-64 md:mb-0 mb-3">
                    {getMessage('common.name')}
                </div>
                <div className="md:flex-grow">
                    {name}
                </div>
            </div>
            <div className="py-8 md:flex flex-wrap md:flex-nowrap">
                <div className="font-semibold md:w-64 md:mb-0 mb-3">
                    {getMessage('common.email')}
                </div>
                <div className="md:flex-grow">
                    {email}
                </div>
            </div>
            <div className="py-8 md:flex flex-wrap md:flex-nowrap">
                <div className="font-semibold md:w-64 md:mb-0 mb-3">
                    {getMessage('common.formTitle')}
                </div>
                <div className="md:flex-grow">
                    {FORM_TITLE[formTitle as keyof typeof FORM_TITLE]}
                </div>
            </div>
            <div className="py-8 md:flex flex-wrap md:flex-nowrap">
                <div className="font-semibold md:w-64 md:mb-0 mb-3">
                    {getMessage('common.contents')}
                </div>
                <div className="md:flex-grow whitespace-pre-line">
                    {contents}
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
            </div>
        </div>
    );
} 