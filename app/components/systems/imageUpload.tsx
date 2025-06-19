'use client';

import { getMessage } from '@/app/utils/messages';
import { useState, useRef } from 'react';

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
    currentImageUrl: string | null;
}

export default function ImageUpload({ onImageSelect, currentImageUrl }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            onImageSelect(file);
        } else {
            setPreview(null);
            onImageSelect(null);
        }
    };

    const handleDeleteImage = () => {
        console.log('handleDeleteImage');
        setPreview(null);
        onImageSelect(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="mb-4">
            <div className="mb-2 block font-bold text-gray-800">{getMessage('common.image')}</div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
                className="mb-2 w-full rounded bg-white text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
            {currentImageUrl && (
                <div className="mb-4">
                    <div className="relative w-auto">
                        <img
                            src={currentImageUrl}
                            alt="Current system image"
                            className="max-w-xs rounded-lg shadow-md"
                        />
                    </div>
                </div>
            )}

            {preview && (
                <div className="mt-4">
                    <span
                        className="-mb-2 rounded-full bg-red-500 px-2 py-1 text-sm text-white"
                        onClick={handleDeleteImage}
                    >
                        X
                    </span>
                    <img src={preview} alt="Preview" className="max-w-xs rounded-lg shadow-md" />
                </div>
            )}
        </div>
    );
}
