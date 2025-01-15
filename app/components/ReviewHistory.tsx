import { ScrollArea } from "@/components/ui/scroll-area"

const dummyHistory = [
  { id: 1, date: '2023-06-25', title: '이용약관 검토' },
  { id: 2, date: '2023-06-24', title: '개인정보 처리방침 검토' },
  { id: 3, date: '2023-06-23', title: '환불 정책 검토' },
]

export default function ReviewHistory() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">이전 검토 요청 내역</h2>
      <ScrollArea className="h-[200px] border p-4 rounded">
        {dummyHistory.map((item) => (
          <div key={item.id} className="mb-2 p-2 bg-gray-100 rounded">
            <div className="font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

