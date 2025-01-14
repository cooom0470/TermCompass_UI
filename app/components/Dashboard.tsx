'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BusinessFeatures from './BusinessFeatures'
import IndividualFeatures from './IndividualFeatures'
import CommonFeatures from './CommonFeatures'

interface DashboardProps {
  userType: 'individual' | 'business'
}

export default function Dashboard({ userType }: DashboardProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  return (
    <div className="w-full max-w-4xl">
      <h1 className="mb-8 text-4xl font-bold">대시보드</h1>
      <Card>
        <CardHeader>
          <CardTitle>{userType === 'business' ? '기업 사용자' : '개인 사용자'} 기능</CardTitle>
          <CardDescription>원하는 기능을 선택하세요</CardDescription>
        </CardHeader>
        <CardContent>
          {userType === 'business' ? (
            <BusinessFeatures activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
          ) : (
            <IndividualFeatures activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
          )}
          <CommonFeatures activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
        </CardContent>
      </Card>
    </div>
  )
}

