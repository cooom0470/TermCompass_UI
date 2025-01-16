'use client'; // 클라이언트 컴포넌트로 지정

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// interface ErrorPageProps: 에러 정보를 전달하기 위한 타입을 정의합니다.
interface ErrorPageProps {
    error: Error;
}

// React.FC<ErrorPageProps>: 타입스크립트에서 함수형 컴포넌트를 정의할 때 사용하는 타입입니다.
const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
    const router = useRouter();
    // useEffect: 컴포넌트가 마운트될 때 즉시 홈 페이지로 리다이렉트합니다
    useEffect(() => {
        // 500 오류 발생 시 바로 홈 페이지로 리다이렉트
        router.push('/');
    }, [router]);

    return null; // 아무것도 렌더링하지 않음
};

export default ErrorPage; 