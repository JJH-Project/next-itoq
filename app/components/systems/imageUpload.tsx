'use client'

import { getMessage } from '@/app/utils/messages';
import { useState, useRef } from 'react'

interface ImageUploadProps {
    onImageSelect: (file: File | null) => void;
    currentImageUrl: string | null;
}

export default function ImageUpload({ onImageSelect, currentImageUrl }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            onImageSelect(file)
        } else {
            setPreview(null)
            onImageSelect(null)
        }
    }

    const handleDeleteImage = () => {
        console.log('handleDeleteImage')
        setPreview(null)
        onImageSelect(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    return (
        <div className="mb-4">
            <div className="block text-gray-800 font-bold mb-2">
                {getMessage('common.image')}
            </div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputRef}
                className="w-full bg-white rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out mb-2"
            />
            {currentImageUrl && (
                <div className="mb-4">
                    <div className="w-auto relative">
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
                    <span className="bg-red-500 rounded-full text-white px-2 py-1 text-sm -mb-2" onClick={handleDeleteImage}>X</span>
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-w-xs rounded-lg shadow-md"
                    />
                </div>
            )}
        </div>
    )
} 