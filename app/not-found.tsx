'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// React.FC: TypeScript에서 함수형 컴포넌트를 정의할 때 사용하는 타입입니다.
const NotFound: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // 404 오류 발생 시 바로 홈 페이지로 리다이렉트
        router.push('/');
    }, [router]);

    return null; // 아무것도 렌더링하지 않음
};

export default NotFound;