"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "../../contexts/AdminAuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportPage() {
  const { admin } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login")
    }
  }, [admin, router])

  if (!admin) {
    return null
  }

  const dummyData = {
    totalReviews: 1000,
    averageProcessingTime: "2.5 hours",
    satisfactionRate: "95%",
    topIndustries: ["전자상거래", "여행", "금융"],
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">서비스 현황/리포트</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>총 검토 건수</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{dummyData.totalReviews}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>평균 처리 시간</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{dummyData.averageProcessingTime}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>사용자 만족도</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{dummyData.satisfactionRate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>주요 산업 분야</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {dummyData.topIndustries.map((industry, index) => (
                <li key={index} className="text-lg">
                  {industry}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

