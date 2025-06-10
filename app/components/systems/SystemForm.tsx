'use client';

import { useState } from 'react';
import ImageUpload from './imageUpload';
import { getMessage } from '@/app/utils/messages';

interface SystemFormProps {
    initialTitle?: string;
    initialContents?: string;
    initialImageUrl?: string | null;
    isSubmitting: boolean;
    onSubmit: (formData: FormData) => Promise<void>;
    onCancel: () => void;
}

export default function SystemForm({
    initialTitle = '',
    initialContents = '',
    initialImageUrl = null,
    isSubmitting,
    onSubmit,
    onCancel
}: SystemFormProps) {
    const [title, setTitle] = useState(initialTitle);
    const [contents, setContents] = useState(initialContents);
    const [image, setImage] = useState<File | null>(null);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(initialImageUrl);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [contentsError, setContentsError] = useState<string | null>(null);

    const handleImageSelect = (file: File | null) => {
        setImage(file);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // check validation
        if (!title) {
            setTitleError(getMessage('validation.title.required'));
            return;
        }
        if (!contents) {
            setContentsError(getMessage('validation.contents.required'));
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('contents', contents);
        if (image) {
            formData.append('image', image);
        }

        await onSubmit(formData);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setTitleError(null);
    };

    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newContents = e.target.value;
        setContents(newContents);
        setContentsError(null);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto">
            <div className="relative mb-4">
                <div className="leading-7 text-gray-800 font-bold mb-2">
                    {getMessage('common.title')}
                    <span className="text-red-500 text-xl"> *</span>
                </div>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {titleError && (
                    <p className="mt-1 text-red-500">{titleError}</p>
                )}
            </div>
            <div className="relative mb-4">
                <div className="leading-7 text-gray-800 font-bold mb-2">
                    {getMessage('common.contents')}
                    <span className="text-red-500 text-xl"> *</span>
                </div>
                <textarea
                    id="contents" 
                    name="contents" 
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 p-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    value={contents}
                    onChange={handleContentsChange}
                ></textarea>
                {contentsError && (
                    <p className="mt-1 text-red-500">{contentsError}</p>
                )}
            </div>
            <div className="relative mb-4">
                <ImageUpload onImageSelect={handleImageSelect} currentImageUrl={currentImageUrl}/>
            </div>
            <div className="flex justify-end space-x-4 w-full sm:w-1/2 mx-auto">
                <button
                    type="button"
                    onClick={onCancel}
                    className="w-full px-6 py-3 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                >
                    {getMessage('common.back')}
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                >
                    {isSubmitting ? getMessage('common.saving') : getMessage('common.save')}
                </button>
            </div>
        </form>
    );
} 