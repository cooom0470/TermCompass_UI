'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const notices = {
  government: [
    { title: '개인정보보호법 개정안 발표', date: '2023-06-15' },
    { title: '전자상거래법 시행령 개정', date: '2023-06-10' },
    { title: '인공지능 윤리기준 가이드라인 발표', date: '2023-06-05' },
  ],
  agency: [
    { title: '2023년 약관 평가 결과 발표', date: '2023-06-20' },
    { title: '소비자 권익 보호 세미나 개최 안내', date: '2023-06-18' },
    { title: '온라인 플랫폼 공정화법 설명회', date: '2023-06-12' },
  ],
  site: [
    { title: '약관나침반 서비스 개선 안내', date: '2023-06-25' },
    { title: '이용약관 개정 예정 안내', date: '2023-06-22' },
    { title: '시스템 점검으로 인한 서비스 일시 중단 안내', date: '2023-06-17' },
  ],
}

export default function NoticeBoard() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">공지사항</h2>
      <Tabs defaultValue="government" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="government">정부 공지</TabsTrigger>
          <TabsTrigger value="agency">진흥원 공지</TabsTrigger>
          <TabsTrigger value="site">사이트 공지</TabsTrigger>
        </TabsList>
        {Object.entries(notices).map(([key, items]) => (
          <TabsContent key={key} value={key}>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{item.title}</span>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}

