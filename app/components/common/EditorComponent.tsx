'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import '@toast-ui/editor/dist/toastui-editor.css';

interface EditorComponentProps {
    onChange?: (content: string) => void;
    name?: string;
    initialValue?: string;
}

const EditorComponent = ({
    onChange,
    name = 'contents',
    initialValue = '',
}: EditorComponentProps) => {
    const [Editor, setEditor] = useState<any>(null);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const loadEditor = async () => {
            const { Editor } = await import('@toast-ui/react-editor');
            setEditor(() => Editor);
        };
        loadEditor();
    }, []);

    const handleImageUpload = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || '이미지 업로드에 실패했습니다.');
            }

            const data = await response.json();
            return data.imageUrl;
        } catch (error) {
            console.error('이미지 업로드 에러:', error);
            throw error;
        }
    };

    const handleChange = () => {
        if (editorRef.current && onChange) {
            const editorInstance = editorRef.current.getInstance();
            const content = editorInstance.getMarkdown();
            console.log('content', content);
            onChange(content);
        }
    };

    if (!Editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <Editor
            height="400px"
            initialEditType="wysiwyg"
            previewStyle="tab"
            ref={editorRef}
            // onChange={handleChange}
            initialValue={initialValue}
            useCommandShortcut={true}
            hideModeSwitch={true}
            onChange={() => {
                const content = editorRef.current?.getInstance().getMarkdown() || '';
                onChange?.(content);
            }}
            hooks={{
                addImageBlobHook: async (blob: Blob, callback: (url: string) => void) => {
                    try {
                        const file = new File([blob], 'image.jpg', { type: blob.type });
                        const imageUrl = await handleImageUpload(file);
                        callback(imageUrl);
                    } catch (error) {
                        console.error('이미지 업로드 에러:', error);
                        // 에러 발생 시 사용자에게 알림
                        alert('이미지 업로드에 실패했습니다.');
                    }
                },
            }}
        />
    );
};

export default EditorComponent;
