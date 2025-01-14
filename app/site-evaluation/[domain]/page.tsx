'use client'

import { useParams, useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

const dummySiteData = {
  'naver.com': {
    name: '네이버',
    logo: 'https://source.unsplash.com/random/100x100?logo',
    domain: 'naver.com',
    rating: 'A',
    info: '대한민국의 대표적인 포털 사이트',
    unfavorableClauses: [
      '서비스 중단 시 보상 제한',
      '개인정보 제3자 제공 범위',
      '콘텐츠 권리 양도'
    ],
    favorableClauses: [
      '개인정보 보호 정책 강화',
      '서비스 이용 편의성 개선',
      '계정 삭제 요청 처리 기간 단축'
    ],
    neutralClauses: [
      '서비스 이용 연령 제한',
      '광고 게재에 관한 사항',
      '준거법 및 관할 법원'
    ]
  },
  // Add more sites as needed
}

export default function SiteEvaluation() {
  const params = useParams()
  const router = useRouter()
  const domain = params.domain as string
  const site = dummySiteData[domain]

  if (!site) {
    return <div>Site not found</div>
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">{site.name} 약관 평가</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4">
            <Image src={`/placeholder.svg?height=100&width=100&text=${site.name} Logo`} alt={`${site.name} 로고`} width={100} height={100} className="mr-4" />
            <div>
              <h2 className="text-2xl font-semibold">{site.name}</h2>
              <p className="text-blue-600">{site.domain}</p>
              <p className="text-xl font-bold mt-2">등급: {site.rating}</p>
            </div>
          </div>
          <p className="text-gray-700">{site.info}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">소비자에게 불리한 조항</h3>
            <ul className="list-disc list-inside">
              {site.unfavorableClauses.map((clause, index) => (
                <li key={index}>{clause}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">소비자에게 유리한 조항</h3>
            <ul className="list-disc list-inside">
              {site.favorableClauses.map((clause, index) => (
                <li key={index}>{clause}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">중립적인 조항</h3>
            <ul className="list-disc list-inside">
              {site.neutralClauses.map((clause, index) => (
                <li key={index}>{clause}</li>
              ))}
            </ul>
          </div>
        </div>

        <Button onClick={() => router.push(`/grade-history/${domain}`)}>
          등급 판정 이력 보기
        </Button>
      </div>
    </Layout>
  )
}

