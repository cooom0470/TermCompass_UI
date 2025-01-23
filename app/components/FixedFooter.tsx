import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function FixedFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const observerRef = useRef<MutationObserver | null>(null);

  const checkScroll = () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const bottomOffset = documentHeight - (scrollPosition + windowHeight);
    
    setIsVisible(bottomOffset <= 50);
  };

  useEffect(() => {
    if (pathname === '/') return;

    // DOM 변화 감지를 위한 MutationObserver 설정
    observerRef.current = new MutationObserver((mutations) => {
      // DOM이 변경될 때마다 스크롤 위치 재계산
      checkScroll();
    });

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      checkScroll();
    };

    // form이 포함된 main 요소 관찰
    const mainElement = document.querySelector('main');
    if (mainElement && observerRef.current) {
      observerRef.current.observe(mainElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      });
    }

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll);
    // 초기 스크롤 위치 확인
    checkScroll();

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]);

  if (pathname === '/') return null;

  return (
    <footer
      className={`fixed bottom-0 left-0 w-full bg-gray-200 transition-opacity duration-300 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ height: '64px' }}
    >
      <div className="container mx-auto h-full flex items-center justify-center">
        <p>© 2025 약관나침반. All rights reserved.</p>
      </div>
    </footer>
  );
}