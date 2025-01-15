import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsReviewProps {
  standardTerms: string
  customClauses: string[]
  onReviewRequest: () => void
}

export default function TermsReview({ standardTerms, customClauses, onReviewRequest }: TermsReviewProps) {
  const fullTerms = `${standardTerms}\n\n추가 조항:\n${customClauses.join('\n')}`

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">약관 검토</h2>
      <ScrollArea className="h-[400px] border p-4 rounded mb-4">
        <pre className="whitespace-pre-wrap">{fullTerms}</pre>
      </ScrollArea>
      <Button onClick={onReviewRequest}>검토 요청</Button>
    </div>
  )
}

