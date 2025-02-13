'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from '../components/Layout';
import Link from 'next/link';
import BoardBar from "@/app/components/BoardBar";
//db에서 데이터를 연동해야할곳
import BoardPageTemplate from '@/app/components/BoardPageTemplate';

const dummyPosts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `${i + 1} 번째 게시글`,
    author: `작성자 ${i + 1}`,
    date: `2025-01-${String(i + 1).padStart(2, '0')}`,
    link: `/board/${i + 1}`,
}));

export default function BoardPage() {
    const postsPerPage = 10;
    const totalPages = Math.ceil(dummyPosts.length / postsPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <Layout>
        <BoardPageTemplate
            title="공지사항"
            breadcrumb={[
                { label: '홈', href: '/' },
                { label: '알림마당', href: '/board' },
                { label: '게시판', href: '/board' },
            ]}
            posts={dummyPosts}
            currentPage={currentPage}
            totalPages={totalPages}
            postsPerPage={postsPerPage}
            onPageChange={handlePageChange}
        />
        </Layout>
    );
}

