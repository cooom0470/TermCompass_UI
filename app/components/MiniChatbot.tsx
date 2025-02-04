'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Maximize2, Minimize2, Clock } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: 'bot' | 'user' | 'system';
  content: string;
  isLink?: boolean;
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { toast } = useToast();

  // 사용자 ID 관리 (랜덤 UUID로 사용자 구분)
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    let sessionUserId = sessionStorage.getItem('user_id');
    if (!sessionUserId) {
      sessionUserId = generateUUID();
      sessionStorage.setItem('user_id', sessionUserId);
    }
    setUserId(sessionUserId);
  }, []);

  // UUID 생성 함수
  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // 고정 선택지 및 응답 처리
  const fixedOptions = [
    { key: '약관 생성', response: '약관 생성 서비스는 회원가입과 로그인을 통해 기업회원 전용으로 사용 가능합니다. (url: 3333.com/약관생성)' },
    { key: '약관 검토', response: '약관 검토 서비스는 일반회원 및 기업회원 모두 사용 가능합니다. (url: 3333.com/약관검토)' },
    { key: '회원가입 및 로그인', response: '회원가입은 홈페이지의 회원가입 버튼을 통해 진행할 수 있습니다. (url: 3333.com/회원가입)' },
    { key: '사이트 등급 확인', response: '사이트 등급 확인은 로그인 후에 이용 가능합니다. (url: 3333.com/사이트등급확인)' },
  ];

  // 초기 시스템 메시지 추가 (비로그인 시)
  useEffect(() => {
    if (!isLoggedIn && messages.length === 0) {
      const systemMessage: Message = { type: 'system', content: '다음 중 원하는 서비스를 선택하세요:' };
      setMessages([systemMessage]);
    }
  }, [isLoggedIn, messages]);

  // 고정 선택지 클릭 시 응답 처리
  const handleOptionSelect = (optionKey: string) => {
    const selectedOption = fixedOptions.find(opt => opt.key === optionKey);
    if (selectedOption) {
      setMessages((prev) => [
        ...prev,
        { type: 'user', content: optionKey },
        { type: 'bot', content: selectedOption.response },
        { type: 'system', content: '추가적으로 알고 싶은 것이 있나요? 다시 선택해 주세요:' },
      ]);
    }
  };

  // 메시지 전송 함수
  const handleSend = async () => {
    if (!input.trim()) return;

    // 사용자 메시지 추가
    setMessages((prev) => [...prev, { type: 'user', content: input }]);

    // 고정 선택지 확인
    if (fixedOptions.some(opt => input.includes(opt.key))) {
      handleOptionSelect(input);
      setInput('');
      return;
    }

    try {
      const response = await fetch('https://9222-35-247-153-228.ngrok-free.app/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, user_id: userId }),
      });

      const data = await response.json();

      // 최종 답변만 표시
      const botMessage: Message = { type: 'bot', content: extractFinalResponse(data.response) };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
      setMessages((prev) => [...prev, { type: 'bot', content: '오류가 발생했습니다. 다시 시도해 주세요.' }]);
    }

    setInput('');
  };

  // 최종 응답 추출 함수
  function extractFinalResponse(response: string): string {
    const parts = response.split('답변:');
    return parts.length > 1 ? parts[parts.length - 1].trim() : response;
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // 히스토리 로드 함수
  const loadChatHistory = (history: ChatHistory) => {
    setMessages(history.messages);
  };

  // 채팅 히스토리 샘플 데이터 추가
  useEffect(() => {
    setHistory([
      {
        id: '1',
        date: '2024-03-15',
        summary: '약관 생성 서비스 문의',
        messages: [
          { type: 'user', content: '약관 생성은 어떻게 하나요?' },
          { type: 'bot', content: '약관 생성 서비스는 기업회원 전용입니다.' },
        ],
      },
      {
        id: '2',
        date: '2024-03-16',
        summary: '회원가입 방법 문의',
        messages: [
          { type: 'user', content: '회원가입 방법을 알려주세요.' },
          { type: 'bot', content: '회원가입은 홈페이지의 회원가입 버튼을 통해 진행할 수 있습니다.' },
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isOpen ? (isExpanded ? 'w-[70vw] h-[70vh]' : 'w-80 h-[450px]') : 'w-12 h-12'}`}>
      {isOpen && (
        <div className="flex h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {isExpanded && user && (
            <div className="w-64 bg-gray-50/80 backdrop-blur-sm border-r border-gray-100">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  이전 대화 기록
                </h3>
                <div className="space-y-2">
                  {history.map((historyItem) => (
                    <div key={historyItem.id} onClick={() => loadChatHistory(historyItem)} className="p-3 bg-white/80 rounded-lg cursor-pointer hover:bg-blue-50 transition-all">
                      <div className="text-xs text-gray-500">{historyItem.date}</div>
                      <div className="text-sm text-gray-700 line-clamp-2">{historyItem.summary}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col h-full flex-grow bg-white">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <span className="font-semibold">약관나침반 도우미</span>
              <div className="flex gap-2">
                {isExpanded ? <Minimize2 className="cursor-pointer" onClick={() => setIsExpanded(false)} /> : <Maximize2 className="cursor-pointer" onClick={() => setIsExpanded(true)} />}
                <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
              </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {messages[messages.length - 1]?.type === 'system' && (
                <div className="flex flex-col space-y-2 mt-4">{fixedOptions.map((option) => (
                  <button key={option.key} onClick={() => handleOptionSelect(option.key)} className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-all">
                    {option.key}
                  </button>
                ))}</div>
              )}
            </div>

            <div className="p-3 border-t">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="메시지를 입력하세요..." className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-lg">
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default MiniChatbot;
