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
      if (isScrollingRef.current) return

      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      const height = container.clientHeight
      const targetIndex = Math.min(
        Math.max(0, activeSection + direction),
        container.children.length - 1
      )

      if (targetIndex !== activeSection) {
        isScrollingRef.current = true
        setActiveSection(targetIndex)

        container.scrollTo({
          top: targetIndex * height,
          behavior: 'smooth',
        })

        setTimeout(() => {
          isScrollingRef.current = false
          // 위로 스크롤할 때 스크롤바 위치 초기화
          if (direction < 0) {
            container.scrollTop = targetIndex * height
          }
        }, 500)
      }
    }

    const handleManualScroll = () => {
      if (!isScrollingRef.current) {
        const currentScroll = container.scrollTop
        const height = container.clientHeight
        const newIndex = Math.round(currentScroll / height)
        
        if (newIndex !== activeSection) {
          setActiveSection(newIndex)
        }
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', handleManualScroll)
    
    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', handleManualScroll)
    }
  }, [activeSection])

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current
    if (container) {
      const currentIndex = activeSection
      container.scrollTo({
        top: index * container.clientHeight,
        behavior: 'smooth'
      })

      setActiveSection(index)

      if (index < currentIndex) {
        setTimeout(() => {
          container.scrollTop = index * container.clientHeight
        }, 500)
      }
    }
  }

  return (
    <Layout>
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y scrollbar-hide"
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
        <div className="snap-start h-[20vh]">
           <FooterSection />
        </div>
      </div>
      <SectionNavigation activeSection={activeSection} onNavigate={scrollToSection} />
    </Layout>
  )
}