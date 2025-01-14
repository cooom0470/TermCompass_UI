'use client'

import { useState } from 'react'
import Layout from '../components/Layout'
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import Image from 'next/image'

const dummySiteRatings = [
  { 
    name: '네이버', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'naver.com',
    rating: 'A',
    benefits: ['개인정보 보호 강화', '서비스 이용 편의성', '콘텐츠 권리 보장'],
    drawbacks: ['데이터 수집 범위', '서비스 중단 가능성', '계정 삭제 절차']
  },
  { 
    name: '카카오', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'kakao.com',
    rating: 'B',
    benefits: ['통합 로그인 기능', '서비스 연동 용이성', '보안 정책 강화'],
    drawbacks: ['광고 타겟팅', '제3자 정보 제공', '서비스 변경 권한']
  },
  { 
    name: '쿠팡', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'coupang.com',
    rating: 'B',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경']
  },
]

export default function SiteRatings() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRatings = dummySiteRatings.filter(rating =>
    rating.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rating.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">사이트별 등급과 약관 평가</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="사이트 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="space-y-6">
            {filteredRatings.map((site) => (
              <Link href={`/site-evaluation/${site.domain}`} key={site.domain} className="block">
                <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <Image src={`/placeholder.svg?height=50&width=50&text=${site.name} Logo`} alt={`${site.name} 로고`} width={50} height={50} className="mr-4" />
                    <div>
                      <h2 className="text-xl font-semibold">{site.name}</h2>
                      <p className="text-blue-600">{site.domain}</p>
                    </div>
                    <span className="ml-auto text-2xl font-bold">{site.rating}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-green-600">주요 장점</h3>
                      <ul className="list-disc list-inside">
                        {site.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600">주요 단점</h3>
                      <ul className="list-disc list-inside">
                        {site.drawbacks.map((drawback, index) => (
                          <li key={index}>{drawback}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

