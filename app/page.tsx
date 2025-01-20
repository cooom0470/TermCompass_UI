// `TermCompass_UI/app/page.tsx`
'use client'

import { useEffect, useRef, useState } from 'react'

import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import NewsAndNoticeSection from './components/NewsAndNoticeSection'
import FooterSection from './components/FooterSection'
import SectionNavigation from './components/SectionNavigation'

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return // 현재 스크롤 중이라면 무시

      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      const height = container.clientHeight
      const targetIndex = Math.min(
        Math.max(0, activeSection + direction), // 다음 섹션 인덱스 계산
        container.children.length - 1
      )

      if (targetIndex !== activeSection) {
        isScrollingRef.current = true
        setActiveSection(targetIndex)

        container.scrollTo({
          top: targetIndex * height,
          behavior: 'smooth',
        })

        // 스크롤 완료 후 상태 업데이트 및 플래그 해제
        setTimeout(() => {
          isScrollingRef.current = false
        }, 500) // 애니메이션 지속 시간과 동기화
      }
    }

    container.addEventListener('wheel', handleWheel)
    return () => container.removeEventListener('wheel', handleWheel)
  }, [activeSection])

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        <div className="snap-start h-screen">
          <HeroSection />
        </div>
        <div className="snap-start h-screen">
          <ServicesSection />
        </div>
        <div className="snap-start h-screen">
          <NewsAndNoticeSection />
        </div>
        <div className="snap-start h-[10vh]">
           <FooterSection />
        </div>
      </div>
      <SectionNavigation activeSection={activeSection} onNavigate={scrollToSection} />
    </Layout>
  )
}