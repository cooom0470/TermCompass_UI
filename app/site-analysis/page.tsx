'use client'

import { useState } from 'react'
import Layout from '@/app/components/Layout'
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
    logo: 'https://images.seeklogo.com/logo-png/35/1/kakaotalk-logo-png_seeklogo-355085.png?v=1957906406423334432',
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
  { 
    name: '11번가', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: '11st.co.kr',
    rating: 'B',
    benefits: ['상품 품질 보증', '개인정보 이용 내역 조회', '청약철회 기간'],
    drawbacks: ['포인트 소멸 정책', '판매자-구매자 분쟁 중재', '서비스 이용 제한']
  },
  { 
    name: '요기요', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'yogiyo.co.kr',
    rating: 'C',
    benefits: ['음식점 위생 정보 제공', '주문 취소 및 환불 절차', '개인정보 제공 내역 공개'],
    drawbacks: ['리뷰 삭제 정책', '고객-음식점 분쟁 책임', '할인 쿠폰 제한']
  },
  { 
    name: 'G마켓', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'gmarket.co.kr',
    rating: 'B',
    benefits: ['구매자 보호 정책', '다양한 결제 옵션', '적립금 제도'],
    drawbacks: ['판매자 귀책사유 면책 조항', '개인정보 활용 범위', '서비스 중단 보상 제한']
  },
  { 
    name: '배달의민족', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'baemin.com',
    rating: 'B',
    benefits: ['주문 취소 및 환불 정책', '고객 리뷰 시스템', '개인정보 보호 정책'],
    drawbacks: ['가격 정책 변경 권한', '배달 지연에 대한 책임 제한', '분쟁 해결 절차']
  },
  { 
    name: '티몬', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'tmon.co.kr',
    rating: 'C',
    benefits: ['쿠폰 및 할인 정책', '간편 결제 시스템', '고객 서비스 채널'],
    drawbacks: ['상품 정보 책임 제한', '개인정보 제3자 제공', '적립금 소멸 정책']
  },
  { 
    name: '위메프', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'wemakeprice.com',
    rating: 'C',
    benefits: ['가격 비교 시스템', '무료 배송 정책', '정기 구독 서비스'],
    drawbacks: ['계정 해지 절차', '환불 처리 기간', '분쟁 해결 비용 부담']
  },
  { 
    name: '당근마켓', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'daangn.com',
    rating: 'B',
    benefits: ['지역 기반 거래 시스템', '사용자 간 직거래 지원', '간편한 판매글 등록'],
    drawbacks: ['거래 사기 책임 제한', '개인정보 노출 위험', '분쟁 중재 한계']
  },
  { 
    name: '인터파크', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'interpark.com',
    rating: 'B',
    benefits: ['통합 예약 시스템', '다양한 카테고리 제공', '멤버십 혜택'],
    drawbacks: ['취소 수수료 정책', '개인정보 보유 기간', '서비스 변경 고지 방식']
  },
  { 
    name: '롯데온', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'lotteon.com',
    rating: 'B',
    benefits: ['통합 포인트 시스템', '오프라인 연계 서비스', '프리미엄 회원 혜택'],
    drawbacks: ['온라인 전용 상품 교환 제한', '멤버십 등급 조정 기준', '개인정보 마케팅 활용']
  },
  { 
    name: '번개장터', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'bunjang.co.kr',
    rating: 'C',
    benefits: ['간편한 중고거래 시스템', '안전결제 서비스', '실시간 채팅 기능'],
    drawbacks: ['허위매물 관리 한계', '개인간 거래 분쟁 해결', '계정 제재 기준']
  },
  { 
    name: '야놀자', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'yanolja.com',
    rating: 'B',
    benefits: ['실시간 예약 시스템', '다양한 숙박 옵션', '포인트 적립 제도'],
    drawbacks: ['취소 및 환불 정책', '숙소 정보 책임 제한', '프로모션 적용 조건']
  },
  { 
    name: '여기어때', 
    logo: 'https://source.unsplash.com/random/50x50?logo', 
    domain: 'goodchoice.kr',
    rating: 'B',
    benefits: ['가격비교 시스템', '쿠폰 할인 정책', '회원 등급별 혜택'],
    drawbacks: ['예약 변경 수수료', '리뷰 작성 제한', '개인정보 제3자 제공 범위']
  }
]

export default function SiteRatings() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredRatings = dummySiteRatings.filter(rating =>
    rating.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rating.domain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">사이트별 등급과 약관 평가</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Input
            type="text"
            placeholder="사이트 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredRatings.map((site) => (
              <Link href={`/site-analysis/${site.domain}`} key={site.domain} className="block">
                <div className="border p-4 rounded-lg hover:shadow-md transition-shadow h-full">
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

