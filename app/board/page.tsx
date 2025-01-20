'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from '../components/Layout';

const dummyPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1} 번째 게시글`,
    author: `작성자 ${i + 1}`,
    date: `2025-01-${String(i + 1).padStart(2, '0')}`,
    link: `/board/${i + 1}`,
    detail: `내용 ${1+i}`
}));

export default function BoardPage() {
    const postsPerPage = 10;
    const totalPages = Math.ceil(dummyPosts.length / postsPerPage);

    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );

    useEffect(() => {
        const pageFromURL = Number(searchParams.get("page"));
        if (pageFromURL && pageFromURL !== currentPage) {
            setCurrentPage(pageFromURL);
        }
    }, [searchParams, currentPage]);

    const currentPosts = dummyPosts.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    const handlePageChange = (page: number) => {
        router.push(`/board?page=${page}`);
        setCurrentPage(page);
    };

    return (
        <Layout>
            <div className="relative w-full h-[300px] overflow-hidden">
                {/* 배경 이미지 */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-md"
                    style={{backgroundImage: "url('/board_img.jpg')"}}
                ></div>

                {/* 텍스트 콘텐츠 */}
                <div className="absolute inset-0 flex items-center justify-center">

                    <div className="flex flex-col items-center">
                        <h1 className="font-custom text-white text-6xl font-bold mb-4">공지사항</h1>
                        <div className="flex items-center space-x-4 px-4 py-2 rounded-lg">
                            <a href="/" className="hover:opacity-80 transition-opacity">
                                <img src="/ic_sub_nav_home.png" alt="Home" className="w-6 h-6"/>
                            </a>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-lg">&gt;</span>
                                <span className="text-gray-700 text-xl font-semibold">게시판</span>
                                <span className="text-gray-500 text-lg">&gt;</span>
                                <span className="text-gray-900 text-xl font-semibold">공지사항</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4 px-4 py-2 mx-auto rounded-lg mt-2 text-4xl justify-center mr-[32%]">
                소통창구
            </div>

            <div className="container mx-auto px-4 py-8 flex">

                {/* 메인 콘텐츠 */}
                <div className="flex-grow">
                    <table className="w-full max-w-5xl  border-collapse border-t-4 border-b border-gray-300 mx-auto">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border-t border-b border-gray-300 font-bold w-1/12">번호</th>
                            <th className="px-4 py-2 border-t border-b border-gray-300 font-bold w-6/12">제목</th>
                            <th className="px-4 py-2 border-t border-b border-gray-300 font-bold w-2/12">작성자</th>
                            <th className="px-4 py-2 border-t border-b border-gray-300 font-bold w-2/12">작성일</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentPosts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-t border-b border-gray-300 text-center">{post.id}</td>
                                <td className="px-4 py-2 border-t border-b text-left">
                                    <a href={`/board/${post.id}`} className="text-blue-500 hover:underline">
                                        {post.title}
                                    </a>
                                </td>
                                <td className="px-4 py-2 border-t border-b text-center">{post.author}</td>
                                <td className="px-4 py-2 border-t border-b text-center">{post.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    {/* 페이지네이션 */}
                    <div className="flex justify-center mt-4">
                        <ul className="flex space-x-2">
                            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                                <li key={page}>
                                    <button
                                        onClick={() => handlePageChange(page)}
                                        className={`px-4 py-2 border ${
                                            currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-white text-gray-700"
                                        } hover:bg-blue-100`}
                                    >
                                        {page}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 우측 메뉴바 */}
                <div className="w-[10%] fixed h-[20%] top-[26%] right-[20%] min-w-[10%]  bg-gray-200 p-4 border-l">
                    <table className=''>

                    </table>
                    <h2 className="text-xl font-bold mb-4">메뉴</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/menu1" className="text-blue-500 hover:underline">
                                메뉴 1
                            </a>
                        </li>
                        <li>
                            <a href="/menu2" className="text-blue-500 hover:underline">
                                메뉴 2
                            </a>
                        </li>
                        <li>
                            <a href="/menu3" className="text-blue-500 hover:underline">
                                메뉴 3
                            </a>
                        </li>
                        <li>
                            <a href="/menu4" className="text-blue-500 hover:underline">
                                메뉴 4
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
