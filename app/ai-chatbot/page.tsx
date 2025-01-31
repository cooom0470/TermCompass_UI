'use client'

import { useState, useRef, useEffect } from 'react'
import Layout from '../components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import ChatSidebar from '../components/ChatSidebar'
import { useUser } from '../contexts/UserContext'

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const { user } = useUser()

  // 메시지 전송 및 API 통신 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // 사용자 메시지 추가
    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)

    try {
      // FastAPI 서버에 메시지 전송
      const response = await fetch('https://1234abcd.ngrok.io/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'user1',  // 로그인된 사용자로 가정
          message: input,
        }),
      })

      const data = await response.json()

      // 서버 응답 메시지 추가
      setMessages((prev) => [...prev, { role: 'bot', content: data.response }])
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error)
      toast({
        title: '오류 발생',
        description: '챗봇 응답을 가져오는 데 실패했습니다.',
        variant: 'destructive',
      })
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: '오류가 발생했습니다. 다시 시도해 주세요.' },
      ])
    }

    setInput('')
  }

  // PDF 파일 업로드 처리
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        const newMessages = [
          ...messages,
          { role: 'user', content: `파일 업로드: ${file.name}` },
          { role: 'bot', content: 'PDF 파일을 성공적으로 업로드했습니다. 약관 내용을 분석 중입니다...' },
        ]
        setMessages(newMessages)
      } else {
        toast({
          title: '파일 형식 오류',
          description: 'PDF 파일만 업로드 가능합니다.',
          variant: 'destructive',
        })
      }
    }
  }

  const handleSelectChat = (chatId: number) => {
    if (chatId === -1) {
      setMessages([])
    } else {
      setMessages([
        { role: 'user', content: '이전 채팅 내용입니다.' },
        { role: 'bot', content: '네, 이전 채팅 내용을 불러왔습니다.' },
      ])
    }
  }

  useEffect(() => {
    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  }, [messages])

  return (
    <Layout>
      <div className="flex h-[calc(100vh-200px)] p-4">
        {user && <ChatSidebar onSelectChat={handleSelectChat} />}
        <div className="flex-grow flex flex-col">
          <h1 className="text-3xl font-bold mb-6 ml-20 text-blue-800 p-4">AI 챗봇</h1>
          <div className="flex-grow bg-white rounded-lg shadow-md flex flex-col overflow-hidden mx-20">
            <ScrollArea className="flex-grow p-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    {message.content}
                  </span>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="약관에 대해 질문하세요..."
                  className="flex-grow"
                />
                <Button className="bg-black text-white hover:bg-blue-600" type="submit">
                  전송
                </Button>
                <input
                  type="file"
                  accept=".pdf"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <Button
                  className="bg-black text-white hover:bg-blue-600"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  PDF 업로드
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
