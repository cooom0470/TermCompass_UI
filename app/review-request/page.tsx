'use client'

import { useState, useRef } from 'react'
import Layout from '../components/Layout'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import ReviewHistory from '../components/ReviewHistory'
import ReviewResult from '../components/ReviewResult'
import { useUser } from '../contexts/UserContext'

export default function ReviewRequest() {
  const [pdfContent, setPdfContent] = useState<string | null>(null)
  const [reviewResult, setReviewResult] = useState<string | null>(null)
  const [isReviewing, setIsReviewing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const [clauseDetails, setClauseDetails] = useState<{ [key: string]: string }>({
    "제7조 2항": "이 조항은 서비스 제공자의 책임을 과도하게 제한하고 있어 소비자의 권리를 침해할 수 있습니다. 관련 법규: 약관규제법 제6조",
    "제12조 1항": "개인정보의 제3자 제공 범위가 불명확하여 개인정보보호법에 위배될 소지가 있습니다. 관련 법규: 개인정보보호법 제17조",
    "제15조 3항": "분쟁 해결 절차가 소비자에게 불리하게 설정되어 있어 검토가 필요합니다. 관련 법규: 소비자기본법 제16조"
  })
  const { user } = useUser()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        // Here you would typically process the PDF file and extract text
        // For this example, we'll just use a dummy text
        setPdfContent("이것은 업로드된 PDF 파일의 내용입니다. 실제 구현에서는 PDF에서 추출한 텍스트가 여기에 표시됩니다.")
        setReviewResult(null)
        toast({
          title: "파일 업로드 성공",
          description: "PDF 파일이 성공적으로 업로드되었습니다.",
        })
      } else {
        toast({
          title: "파일 형식 오류",
          description: "PDF 파일만 업로드 가능합니다.",
          variant: "destructive"
        })
      }
    }
  }

  const handleReviewRequest = () => {
    if (!pdfContent) {
      toast({
        title: "검토 요청 실패",
        description: "먼저 PDF 파일을 업로드해주세요.",
        variant: "destructive"
      })
      return
    }

    setIsReviewing(true)
    // Here you would typically send the content to your AI model for review
    // For this example, we'll use a timeout to simulate the process
    setTimeout(() => {
      setReviewResult("이용약관 중 <span class='bg-yellow-200'>제7조 2항</span>과 <span class='bg-yellow-200'>제12조 1항</span>은 소비자에게 불리한 독소조항으로 의심됩니다. <span class='bg-yellow-200'>제15조 3항</span>은 법적 검토가 필요합니다. 자세한 내용은 해당 조항을 클릭하여 확인하세요.")
      setIsReviewing(false)
      toast({
        title: "검토 완료",
        description: "약관 검토가 완료되었습니다.",
      })
    }, 3000)
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">약관 검토 요청</h1>
        <div className="flex gap-4">
          <div className="w-1/2">
            {user && <ReviewHistory />}
            <div className="mt-4">
              <input
                type="file"
                accept=".pdf"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                PDF 업로드
              </Button>
            </div>
            {pdfContent && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">업로드된 약관 내용</h2>
                <ScrollArea className="h-[300px] border p-4 rounded">
                  <p>{pdfContent}</p>
                </ScrollArea>
                <Button 
                  className="mt-4" 
                  onClick={handleReviewRequest}
                  disabled={isReviewing}
                >
                  {isReviewing ? '검토 중...' : '약관 검토 요청'}
                </Button>
              </div>
            )}
          </div>
          <div className="w-1/2">
            <ReviewResult result={reviewResult} clauseDetails={clauseDetails} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

