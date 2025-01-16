import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface StandardTermsFormProps {
  domain: string
  onSubmit: (terms: string) => void
  onBack: () => void
}

export default function StandardTermsForm({ domain, onSubmit, onBack }: StandardTermsFormProps) {
  const [terms, setTerms] = useState(getStandardTerms(domain))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(terms)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">{domain} 표준 약관</h2>
      <Textarea
        value={terms}
        onChange={(e) => setTerms(e.target.value)}
        className="h-[400px] mb-4"
      />
      <div className="flex justify-between">
        <Button className="bg-black text-white hover:bg-blue-600 hover:text-white" variant="outline" onClick={onBack}>이전</Button>
        <Button type="submit" className="bg-black text-white hover:bg-blue-600">다음</Button>
      </div>
    </form>
  )
}

function getStandardTerms(domain: string): string {
  // In a real application, this would fetch the appropriate standard terms based on the domain
  return `${domain}에 대한 표준 약관

1. 서비스 이용 약관
2. 개인정보 처리방침
3. 결제 및 환불 정책
4. 서비스 제공 및 중단
5. 사용자의 의무와 책임
6. 지적재산권
7. 분쟁 해결 및 준거법

... (기타 표준 약관 내용)`
}

