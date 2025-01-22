'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
//DB에서 연동해야할곳
const dummyPosts = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1} 번째 게시글`,
    author: `작성자 ${i + 1}`,
    date: `2025-01-${String(i + 1).padStart(2, '0')}`,
    detail: `이것은 ${i + 1} 번째 게시글의 상세 내용입니다ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ.`,
}));

export default function PostDetail() {
    const [post, setPost] = useState<any>(null);
    const { id } = useParams(); // id는 string | undefined
    const postId = id ? parseInt(id, 10) : NaN; // string을 number로 변환
    if (isNaN(postId)) {
        return <p>잘못된 게시글 ID입니다.</p>; // 변환 실패 시 처리
    }
    useEffect(() => {
        // 게시글을 ID 기준으로 내림차순 정렬
        const sortedPosts = [...dummyPosts].sort((a, b) => b.id - a.id);
        setPost(sortedPosts);
    }, []);

    const previousPost = dummyPosts.find((post) => post.id === postId - 1);
    const nextPost = dummyPosts.find((post) => post.id === postId + 1);
    useEffect(() => {
        const selectedPost = dummyPosts.find((p) => p.id === Number(id));
        setPost(selectedPost);
    }, [id]);

    if (!post) {
        return <p className="text-gray-700">게시글을 불러오는 중입니다...</p>;
    }

    return (

        <div className="container mx-auto px-4 py-8 w-[40%] rounded-none border-none items-baseline">

            <div className="p-6 bg-green  rounded-md  ">

                <h2 className="text-3xl font-bold mb-4 border-b-2 font-custom  border-t-1 pb-1">{post.title}</h2>
                <div className="flex items-center justify-between pb-1 border-b-2">
                    <span className="text-gray-800 font-semibold">작성자: {post.author} </span>
                    <span className="text-gray-500 text-sm "> {post.date}</span>
                </div>
                <div className="text-gray-800 pt-10 border-b-2 min-h-[300px]">
                    <p className="text-lg break-words">{post.detail}</p>
                </div>
            </div>
            <table className="w-full max-w-4xl border-collapse border border-gray-300 mx-auto">
                <tbody>
                {nextPost && (
                    <tr>
                        <td className="px-4 py-2 border bg-gray-200 border-b-gray-500 border-gray-300 text-center font-semibold">
                            ▲ 다음글
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <a
                                href={`/board/${nextPost.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {nextPost.title}
                            </a>
                        </td>
                        <td className="px-4 py-2 border border-gray-300"><a
                            href={`/board/${nextPost.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            {nextPost.author}
                        </a>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <a
                                href={`/board/${nextPost.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {nextPost.date}
                            </a>
                        </td>
                    </tr>
                )}
                {previousPost && (
                    <tr>
                        <td className="px-4 py-2 border bg-gray-200 border-b-gray-500 border-t-gray-500  text-center font-semibold">
                            ▼ 이전글
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <a
                                href={`/board/${previousPost.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {previousPost.title}
                            </a>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <a
                                href={`/board/${previousPost.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {previousPost.author}
                            </a>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <a
                                href={`/board/${previousPost.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                {previousPost.date}
                            </a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>


        </div>
    );
}
