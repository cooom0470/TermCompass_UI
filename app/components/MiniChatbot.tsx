'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, X, Send, Maximize2, Minimize2, User, Building2, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: 'bot' | 'user';
  content: string;
  isLink?: boolean;
  link?: string;
  action?: () => void;
}

interface ChatHistory {
  id: string;
  date: string;
  summary: string;
  messages: Message[];
}

const MiniChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 여부 상태 추가
  const [messages, setMessages] = useState<Message[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  // 로그인 상태 확인 함수 (API 호출)
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('https://1234abcd.ngrok.io/login-status?user_id=guest');
      const data = await response.json();
      setIsLoggedIn(data.is_logged_in);
    } catch (error) {
      console.error('로그인 상태 확인 중 오류 발생:', error);
      toast({
        title: "오류 발생",
        description: "로그인 상태 확인에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  // 컴포넌트가 로드될 때 로그인 상태 확인
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 챗봇 메시지 전송 함수
  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // FastAPI 서버에 메시지 전송
      const response = await fetch('https://1234abcd.ngrok.io/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: isLoggedIn ? 'user1' : 'guest',
          message: input,
        }),
      });

      const data = await response.json();

      // API 응답 추가
      const botMessage: Message = { type: 'bot', content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      setMessages((prev) => [
        ...prev,
        { type: 'bot', content: '오류가 발생했습니다. 다시 시도해 주세요.' },
      ]);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const loadChatHistory = (history: ChatHistory) => {
    setMessages(history.messages);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isOpen
        ? isExpanded
          ? 'w-[70vw] h-[70vh]'
          : 'w-80 h-[450px]'
        : 'w-12 h-12'
    }`}>
      {isOpen && (
        <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* 채팅 히스토리 사이드바 */}
          {isExpanded && user && (
            <div className="w-64 bg-gray-50/80 backdrop-blur-sm border-r border-gray-100">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  이전 대화 기록
                </h3>
                <div className="space-y-2">
                  {/* 예시 채팅 히스토리 */}
                  <div
                    onClick={() => loadChatHistory({
                      id: '1',
                      date: '2024-03-15',
                      summary: '약관 생성 서비스 문의',
                      messages: [
                        { type: 'user', content: '약관 생성은 어떻게 하나요?' },
                        { type: 'bot', content: '약관 생성 서비스는 기업회원 전용입니다.' },
                      ],
                    })}
                    className="p-3 bg-white/80 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-blue-50 transition-all duration-200 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="text-xs text-gray-500">2024-03-15</div>
                    <div className="text-sm text-gray-700 line-clamp-2">약관 생성 서비스 문의</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 메인 챗봇 영역 */}
          <div className="flex flex-col h-full flex-grow bg-white">
            {/* 챗봇 헤더 */}
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <div className="flex items-center gap-2">
                <span className="font-semibold">약관나침반 도우미</span>
                {user && (
                  <div className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-full text-xs">
                    {user.userType === 'COMPANY' ? <Building2 size={12} /> : <User size={12} />}
                    {user.userType === 'COMPANY' ? '기업회원' : '개인회원'}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                {isExpanded ? (
                  <Minimize2 className="cursor-pointer" onClick={() => setIsExpanded(false)} />
                ) : (
                  <Maximize2 className="cursor-pointer" onClick={() => setIsExpanded(true)} />
                )}
                <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
              </div>
            </div>

            {/* 메시지 영역 */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* 입력 영역 */}
            <div className="p-3 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default MiniChatbot;
