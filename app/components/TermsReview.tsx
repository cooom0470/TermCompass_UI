import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsReviewProps {
  standardTerms: string
  customClauses: string[]
  onBack: () => void
  onReviewRequest: () => void
}

export default function TermsReview({ standardTerms, customClauses, onBack, onReviewRequest }: TermsReviewProps) {
  const fullTerms = `${standardTerms}\n\n추가 조항:\n${customClauses.join('\n')}`

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">약관 검토</h2>
      <ScrollArea className="h-[400px] border p-4 rounded mb-4">
        <pre className="whitespace-pre-wrap">{fullTerms}</pre>
      </ScrollArea>
      <div className="flex justify-between">
        <Button type="button" className="bg-black text-white hover:bg-blue-600" onClick={onBack}>이전</Button>
        <Button className="bg-black text-white hover:bg-blue-600" onClick={onReviewRequest}>검토 요청</Button>
      </div>
    </div>
  )
}

