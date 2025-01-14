'use client'

import { useState } from 'react'
import Layout from '../components/Layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const dummyHistory = [
  { id: 1, date: '2023-06-01', website: '네이버', status: '완료', rating: 'A' },
  { id: 2, date: '2023-06-05', website: '카카오', status: '완료', rating: 'B' },
  { id: 3, date: '2023-06-10', website: '쿠팡', status: '진행 중', rating: '-' },
  { id: 4, date: '2023-06-15', website: '배달의민족', status: '완료', rating: 'B' },
  { id: 5, date: '2023-06-20', website: '당근마켓', status: '완료', rating: 'A' },
]

export default function ReviewHistory() {
  const [selectedReview, setSelectedReview] = useState<typeof dummyHistory[0] | null>(null)

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">검토 내역</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>날짜</TableHead>
                <TableHead>웹사이트</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>등급</TableHead>
                <TableHead>상세</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyHistory.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>{review.website}</TableCell>
                  <TableCell>{review.status}</TableCell>
                  <TableCell>{review.rating}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" onClick={() => setSelectedReview(review)}>
                          상세 보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>검토 상세 내역</DialogTitle>
                          <DialogDescription>
                            {selectedReview?.website}의 약관 검토 결과입니다.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>날짜: {selectedReview?.date}</div>
                          <div>상태: {selectedReview?.status}</div>
                          <div>등급: {selectedReview?.rating}</div>
                          <div>
                            검토 의견: 이 부분은 실제 서비스에서 상세한 검토 의견이 표시될 곳입니다.
                            현재는 더미 데이터를 사용하고 있어 구체적인 내용이 없습니다.
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  )
}

