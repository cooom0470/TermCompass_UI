'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import AuthForm from './AuthForm'
import { useUser } from '../contexts/UserContext'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import MobileNav from './MobileNav'
import FooterSection from './FooterSection'
import FixedFooter from './FixedFooter' // 새로운 footer 컴포넌트 import

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showAuthForm, setShowAuthForm] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { user, login, logout } = useUser()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  
  // 로그인한 사용자만 접근 가능한 페이지 목록
  const authenticatedPaths = [
    '/create-terms',
    '/modify-terms',
    '/business-history',
    '/review-history',
    '/review-request',
    '/ai-chatbot'
  ]

  // 현재 페이지가 로그인 필요 페이지인지 확인
  const isAuthenticatedPage = authenticatedPaths.some(path => pathname.startsWith(path))
  
  
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.location.href = '/' // 완전한 페이지 새로고침으로 변경
    } else {
      router.push('/')
    }
  }
  // root 페이지에서만 스크롤 초기화
  useEffect(() => {
    if (pathname === '/') {
      window.scrollTo(0, 0)
    }
  }, [pathname])


  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768) // 768px is typically used for tablet breakpoint
      }

      handleResize() // Call once to set initial state
      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const businessOnlyPaths = ['/create-terms', '/modify-terms', '/business-history']
    if (!isLoggingOut && businessOnlyPaths.includes(pathname) && (!user || user.userType !== 'COMPANY')) {
      toast({
        title: "접근 제한",
        description: "이 기능은 기업 사용자 전용입니다.",
        variant: "destructive",
      })
      router.push('/')
    }
  }, [pathname, user, router, isLoggingOut])
  
  const navItems = [
    { href: '/', label: '홈' },
    { href: '/ai-chatbot', label: 'AI 챗봇' },
    { href: '/site-analysis', label: '사이트 등급' },
    { href: '/review-request', label: '약관 검토' },
    { href: '/board', label: '게시판' },

      ...(user
      ? user.userType === 'COMPANY'
        ? [
            { href: '/create-terms', label: '약관 생성' },
            { href: '/modify-terms', label: '약관 수정' },
            { href: '/business-history', label: '이용 내역' },
          ]
        : [
            { href: '/review-history', label: '검토 내역' },
          ]
      : []
    ),
  ]

  const handleAuthSubmit = (
    name: string,
    email: string, 
    password: string, 
    userType: 'PERSONAL' | 'COMPANY',
    businessNumber: string,
    isLogin: boolean
  ) => {
    login(email, userType)
    setShowAuthForm(false)
    console.log('Business Number:', businessNumber)
  }

  const handleLogout = () => {
      setIsLoggingOut(true)
      logout()
      router.push('/')
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 ${pathname === '/' ? 'overflow-hidden' : ''}">
      <header className="bg-gray-500 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="cursor-pointer" onClick={handleHomeClick}>
            <Image
              src="/TermCompass_logo.png"
              alt="TermCompass Logo"
              width={50}
              height={50}
            />
          </div>
          {isMobile ? (
            <MobileNav
              navItems={navItems}
              user={user}
              onLogout={handleLogout}
              onLogin={() => setShowAuthForm(true)}
            />
          ) : (
            <>
              <nav>
                <ul className="flex space-x-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`hover:text-blue-200 transition-colors ${
                          pathname === item.href ? 'text-blue-200' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="bg-white text-blue-700 hover:bg-blue-100"
                >
                  로그아웃
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAuthForm(true)}
                  variant="outline"
                  className="bg-white text-blue-700 hover:bg-blue-100"
                >
                  로그인 / 회원가입
                </Button>
              )}
            </>
          )}
        </div>
      </header>
      <main className={`flex-grow ${pathname !== '/' ? 'pb-20' : ''}`}> {/* root 페이지가 아닌 경우에만 패딩 추가 */}
        {children}
      </main>
      {pathname !== '/' && <FixedFooter />} 
      {showAuthForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AuthForm
            onSubmit={handleAuthSubmit}
            onCancel={() => setShowAuthForm(false)}
          />
        </div>
      )}
    </div>
  )
}