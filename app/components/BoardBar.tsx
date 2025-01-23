'use client';

import { useState } from "react";

export default function BoardBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            {/* 햄버거 버튼 - 작은 화면에서만 표시 */}
            <button
                className="fixed top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md [@media(min-width:1204px)]:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? '닫기' : '메뉴'}
            </button>

            {/* 메뉴바 */}
            <div
                className={`fixed top-[23%] right-[17%] w-[80%] md:w-[10%] h-[40%] min-w-[200px]  p-4 border-l shadow-md transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:translate-x-0`}
            >
                <h2 className="text-xl font-bold mb-4 bg-gray-200 p-2 rounded-md">알림마당</h2>
                <ul className="space-y-2">
                    <li className="border-b border-gray-300 pb-2">
                        <a href="/board" className="text-black hover:underline">
                            공지사항
                        </a>
                    </li>
                    <li className="border-b border-gray-300 pb-2">
                        <a href="/photonews" className="text-black hover:underline">
                            포토뉴스
                        </a>
                    </li>
                    <li className="border-b border-gray-300 pb-2">
                        <a href="/menu3" className="text-black hover:underline">
                            메뉴 3
                        </a>
                    </li>
                    <li className="border-b border-gray-300 pb-2">
                        <a href="/menu4" className="text-black hover:underline">
                            메뉴 4
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    );
}
