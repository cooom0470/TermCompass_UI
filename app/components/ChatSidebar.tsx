import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// Dummy data for chat history
const dummyChatHistory = [
  { id: 1, title: "약관 해석 문의", date: "2023-06-25" },
  { id: 2, title: "개인정보 처리방침 검토", date: "2023-06-24" },
  { id: 3, title: "이용약관 독소조항 확인", date: "2023-06-23" },
  { id: 4, title: "서비스 약관 문의", date: "2023-06-22" },
  { id: 5, title: "환불 정책 검토", date: "2023-06-21" },
]

export default function ChatSidebar() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  return (
    <div className="w-64 bg-gray-100 p-4 rounded-lg">
      <Button className="w-full mb-4">새 채팅</Button>
      <ScrollArea className="h-[calc(100vh-200px)]">
        {dummyChatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`p-2 mb-2 rounded cursor-pointer ${
              selectedChat === chat.id ? 'bg-blue-200' : 'hover:bg-gray-200'
            }`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <div className="font-semibold">{chat.title}</div>
            <div className="text-sm text-gray-500">{chat.date}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}

