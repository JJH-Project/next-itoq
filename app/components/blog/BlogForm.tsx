'use client';

import { getMessage } from '@/app/utils/messages';
import EditorComponent from '@/app/components/common/EditorComponent';
import { useState } from 'react';

interface BlogFormProps {
    initialTitle?: string;
    initialContents?: string;
    isSubmitting: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

export default function BlogForm({
    initialTitle = '',
    initialContents = ' ',
    isSubmitting,
    onSubmit,
    onCancel,
}: BlogFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [contents, setContents] = useState(initialContents);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [contentsError, setContentsError] = useState<string | null>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // check validation
        if (!title) {
            setTitleError(getMessage('validation.title.required'));
            return;
        }

        if (!contents || contents.trim() === '') {
            setContentsError(getMessage('validation.contents.required'));
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);

        await onSubmit(formData);
    };

    const handleTitleChange = (e: any) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setTitleError(null);
    };

    const handleEditorChange = (content: string) => {
        setContents(content);
        setContentsError(null);
    };

    return (
        <div className="mx-auto w-full space-y-6 md:w-3/4 lg:w-2/3 xl:w-1/2">
            <div className="relative mb-4">
                <div className="mb-2 font-bold leading-7 text-gray-800">
                    {getMessage('common.title')}
                    <span className="text-xl text-red-500"> *</span>
                </div>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full rounded-lg border px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {titleError && <p className="mt-1 text-red-500">{titleError}</p>}
            </div>

            <div className="relative mb-4">
                <div className="mb-2 font-bold leading-7 text-gray-800">
                    {getMessage('common.contents')}
                    <span className="text-xl text-red-500"> *</span>
                </div>
                <EditorComponent onChange={handleEditorChange} initialValue={initialContents} />
                {contentsError && <p className="mt-1 text-red-500">{contentsError}</p>}
            </div>

            <div className="mx-auto flex w-full justify-end space-x-4 sm:w-1/2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full rounded border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50"
                >
                    {getMessage('common.back')}
                </button>
                <button
                    type="button"
                    disabled={isSubmitting || !!titleError || !!contentsError}
                    onClick={handleSubmit}
                    className="w-full rounded bg-gray-800 px-6 py-3 text-white hover:bg-gray-600 disabled:opacity-50"
                >
                    {isSubmitting ? getMessage('common.saving') : getMessage('common.save')}
                </button>
            </div>
        </div>
    );
}
