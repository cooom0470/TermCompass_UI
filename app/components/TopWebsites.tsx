import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export const topWebsites = [
  {
    name: '네이버',
    benefits: ['개인정보 보호 강화', '서비스 이용 편의성', '콘텐츠 권리 보장'],
    drawbacks: ['데이터 수집 범위', '서비스 중단 가능성', '계정 삭제 절차'],
    link: '/site-analysis/naver.com'
  },
  {
    name: '카카오',
    benefits: ['통합 로그인 기능', '서비스 연동 용이성', '보안 정책 강화'],
    drawbacks: ['광고 타겟팅', '제3자 정보 제공', '서비스 변경 권한'],
    link: '/site-analysis/kakao.com'
  },
  {
    name: '쿠팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  },
  {
    name: '쿠ddfdsfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  },
  {
    name: '쿠sdfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  }
  ,
  {
    name: '쿠sdfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  }
  ,
  {
    name: '쿠sdfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  }
  ,
  {
    name: '쿠sdfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  }
  ,
  {
    name: '쿠sdfsd팡',
    benefits: ['반품 정책', '배송 서비스', '회원 혜택'],
    drawbacks: ['개인정보 활용 범위', '분쟁 해결 절차', '가격 정책 변경'],
    link: '/site-analysis/coupang.com'
  }
]

export default function TopWebsites() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">인기 사이트 약관 분석</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topWebsites.map((site) => (
          <Link href={site.link} key={site.name}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{site.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold text-green-600">주요 이점</h3>
                  <ul className="list-disc list-inside">
                    {site.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600">주의 사항</h3>
                  <ul className="list-disc list-inside">
                    {site.drawbacks.map((drawback, index) => (
                      <li key={index}>{drawback}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

