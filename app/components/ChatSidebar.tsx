import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation'

// Dummy data for chat history
const dummyChatHistory = [
  { id: 1, title: "약관 해석 문의", date: "2023-06-25" },
  { id: 2, title: "개인정보 처리방침 검토", date: "2023-06-24" },
  { id: 3, title: "이용약관 독소조항 확인", date: "2023-06-23" },
  { id: 4, title: "서비스 약관 문의", date: "2023-06-22" },
  { id: 5, title: "환불 정책 검토", date: "2023-06-21" },
]

interface ChatSidebarProps {
  onSelectChat: (chatId: number) => void;
}

export default function ChatSidebar({ onSelectChat }: ChatSidebarProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const router = useRouter()

  const handleNewChat = () => {
    // Reset the selected chat and create a new one
    setSelectedChat(null)
    onSelectChat(-1) // -1 indicates a new chat
  }

  const handleSelectChat = (chatId: number) => {
    setSelectedChat(chatId)
    onSelectChat(chatId)
  }

  return (
      <div className="w-64 bg-gray-100 p-4 h-full">
        <Button className="w-full mb-4" onClick={handleNewChat}>새 채팅</Button>
        <ScrollArea className="h-[calc(100vh-200px)]">
          {dummyChatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                selectedChat === chat.id ? 'bg-blue-200' : 'hover:bg-gray-200'
              }`}
              onClick={() => handleSelectChat(chat.id)}
            >
              <div className="font-semibold">{chat.title}</div>
              <div className="text-sm text-gray-500">{chat.date}</div>
            </div>
          ))}
        </ScrollArea>
      </div>
  )
}

