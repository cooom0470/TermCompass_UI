import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface TermsAgreementProps {
  onAgree: () => void
  onCancel: () => void
}

export default function TermsAgreement({ onAgree, onCancel }: TermsAgreementProps) {
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [privacyAgreed, setPrivacyAgreed] = useState(false)

  const handleAgree = () => {
    if (termsAgreed && privacyAgreed) {
      onAgree()
    }
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>이용 약관 동의</CardTitle>
        <CardDescription>서비스 이용을 위해 약관에 동의해 주세요.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">이용 약관</h3>
          <ScrollArea className="h-[100px] border p-2 rounded">
            <p>
              이용 약관 내용... (실제 약관 내용으로 대체해야 합니다)
            </p>
          </ScrollArea>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="terms" checked={termsAgreed} onCheckedChange={(checked) => setTermsAgreed(checked as boolean)} />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              이용 약관에 동의합니다
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-2">개인정보 수집 및 제공 약관</h3>
          <ScrollArea className="h-[100px] border p-2 rounded">
            <p>
              개인정보 수집 및 제공 약관 내용... (실제 약관 내용으로 대체해야 합니다)
            </p>
          </ScrollArea>
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox id="privacy" checked={privacyAgreed} onCheckedChange={(checked) => setPrivacyAgreed(checked as boolean)} />
            <label htmlFor="privacy" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              개인정보 수집 및 제공 약관에 동의합니다
            </label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>취소</Button>
        <Button className="bg-black text-white hover:bg-blue-600" onClick={handleAgree} disabled={!termsAgreed || !privacyAgreed}>동의</Button>
      </CardFooter>
    </Card>
  )
}

