"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "../contexts/AdminAuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Star } from "lucide-react"

export default function AdminDashboard() {
  const { admin } = useAdminAuth()
  const router = useRouter()
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!admin && !hasRedirected) {
      setHasRedirected(true); // 리디렉션 상태를 기록
      router.push("/admin/login");
    }
  }, [admin, router, hasRedirected]);

  // admin이 없으면 아무 것도 렌더링하지 않음
  if (admin === null) {
    return null
  }

  const dummyData = {
    totalUsers: 1234,
    totalReviews: 5678,
    averageRating: 4.7,
  }

  return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">관리자 대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 사용자 수</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyData.totalUsers}</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 리뷰 수</CardTitle>
              <FileText className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyData.totalReviews}</div>
              <p className="text-xs text-gray-500">+180 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">평균 평점</CardTitle>
              <Star className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyData.averageRating}</div>
              <p className="text-xs text-gray-500">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
