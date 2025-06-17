// 'use client';

// import { Editor } from '@toast-ui/react-editor';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { useRef } from 'react';

// interface EditorComponentProps {
//     onChange?: (content: string) => void;
//     initialValue?: string;
// }

// const EditorComponent = ({ onChange, initialValue = '' }: EditorComponentProps) => {
//     const editorRef = useRef<Editor>(null);

//     const handleImageUpload = async (file: File) => {
//         try {
//             const formData = new FormData();
//             formData.append('file', file);

//             const response = await fetch('/api/upload', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || '이미지 업로드에 실패했습니다.');
//             }

//             const data = await response.json();
//             return data.imageUrl;
//         } catch (error) {
//             console.error('이미지 업로드 에러:', error);
//             throw error;
//         }
//     };

//     return (
//         <Editor
//             ref={editorRef}
//             initialValue={initialValue}
//             previewStyle="vertical"
//             height="600px"
//             initialEditType="markdown"
//             useCommandShortcut={true}
//             onChange={() => {
//                 const content = editorRef.current?.getInstance().getMarkdown() || '';
//                 onChange?.(content);
//             }}
//             hooks={{
//                 addImageBlobHook: async (blob: Blob, callback: (url: string) => void) => {
//                     try {
//                         const file = new File([blob], 'image.jpg', { type: blob.type });
//                         const imageUrl = await handleImageUpload(file);
//                         callback(imageUrl);
//                     } catch (error) {
//                         console.error('이미지 업로드 에러:', error);
//                         // 에러 발생 시 사용자에게 알림
//                         alert('이미지 업로드에 실패했습니다.');
//                     }
//                 },
//             }}
//         />
//     );
// };

// export default EditorComponent;
