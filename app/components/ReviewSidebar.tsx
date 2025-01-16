import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// 더미 데이터 - 실제 구현시 서버에서 가져와야 합니다
const dummyHistory = [
  { id: 1, date: '2023-06-25', title: '이용약관 검토' },
  { id: 2, date: '2023-06-24', title: '개인정보 처리방침 검토' },
  { id: 3, date: '2023-06-23', title: '환불 정책 검토' },
]

interface ReviewSidebarProps {
  onSelectReview: (reviewId: number | null) => void;
  selectedReviewId: number | null;
}

export default function ReviewSidebar({ onSelectReview, selectedReviewId }: ReviewSidebarProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 h-full">
      <Button className="w-full mb-4" onClick={() => onSelectReview(null)}>새 검토 요청</Button>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {dummyHistory.map((review) => (
          <div
            key={review.id}
            className={`p-2 mb-2 rounded cursor-pointer ${
              selectedReviewId === review.id ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => onSelectReview(review.id)}
          >
            <div className="font-semibold">{review.title}</div>
            <div className="text-sm text-gray-500">{review.date}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

