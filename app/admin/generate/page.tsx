"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "../../contexts/AdminAuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeneratePage() {
  const { admin } = useAdminAuth()
  const router = useRouter()
  const [industry, setIndustry] = useState("")
  const [generatedTerms, setGeneratedTerms] = useState("")

  useEffect(() => {
    if (!admin) {
      router.push("/admin/login")
    }
  }, [admin, router])

  if (!admin) {
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your AI model
    setGeneratedTerms(
      `이것은 ${industry}를 위한 임시 생성된 표준약관입니다. 실제 구현에서는 AI 모델이 생성한 약관이 여기에 표시됩니다.`,
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">표준약관 생성</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>산업 분야 입력</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="industry">산업 분야</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="예: 전자상거래, 여행, 숙박 등"
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Button type="submit">표준약관 생성</Button>
      </form>
      {generatedTerms && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>생성된 표준약관</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={generatedTerms} readOnly className="mt-2" rows={10} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

