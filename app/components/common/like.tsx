'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { getMessage } from '@/app/utils/messages';

// get likes count from notion
export default function Like({ systemId }: { systemId: string }) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const { data: session } = useSession();

    useEffect(() => {
        fetch(`/api/like/count?systemId=${systemId}`)
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count || 0);
            });
    }, [systemId]);

    const toggleLike = async () => {
        const res = await fetch('/api/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ systemId }),
        });
        try {
            const data = await res.json();
            if (data.error) {
                Swal.fire({
                    icon: 'info',
                    title: 'Info',
                    text: getMessage('validation.notAuthorizedTitle'),
                    customClass: {
                        confirmButton: 'bg-gray-600 hover:bg-gray-400 text-white px-6 py-2 rounded',
                    },
                });
                return;
            }
            // いいねした場合はカウントを増やし、いいねを解除した場合はカウントを減らす
            if (data.liked) {
                setLiked(data.liked);
                setCount(count + 1);
            } else {
                setLiked(data.liked);
                setCount(count - 1 > 0 ? count - 1 : 0);
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex flex-row items-center justify-end" onClick={toggleLike}>
            <img src="/images/like.png" alt="like" className="mr-2 h-6 w-6 cursor-pointer" />
            <span className="text-sm text-gray-500">{count}</span>
        </div>
    );
}
