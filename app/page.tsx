'use client'

import { useEffect, useRef } from 'react'

import Layout from './components/Layout'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import NoticeBoard from './components/NoticeBoard'
import PhotoNews from './components/PhotoNews'

function useScrollSnap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      const height = container.clientHeight
      const scrollAmount = direction * height
      container.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return containerRef
}

export default function Home() {
  const scrollContainerRef = useScrollSnap()

  return (
    <Layout>
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
      >
        <div className="snap-start h-screen">
          <HeroSection />
        </div>
        <div className="snap-start h-screen">
          <ServicesSection />
        </div>
        <div className="snap-start h-screen flex justify-center items-center">
            <div className="flex flex-row justify-center items-center w-full gap-32">
              <NoticeBoard className="w-1/2 p-4" />
              <PhotoNews className="w-1/2 p-4" />
            </div>
        </div>
      </div>
    </Layout>
  )
}
