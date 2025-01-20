'use client';

import { useParams } from 'next/navigation';

export default function PostPage() {
    const { id } = useParams(); // 동적 경로에서 id 값 가져오기

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">게시글 ID: {id}</h1>
            <p>여기에 게시글 내용을 렌더링하세요.</p>
        </div>
    );
}
