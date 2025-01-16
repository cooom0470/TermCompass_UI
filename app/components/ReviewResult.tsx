import { useState, useCallback } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ReviewResultProps {
  result: string | null
  clauseDetails: { [key: string]: string }
  isExistingReview?: boolean
}

export default function ReviewResult({ result, clauseDetails, isExistingReview = false }: ReviewResultProps) {
  const [selectedClause, setSelectedClause] = useState<string | null>(null)
  const grade = result ? 'B' : null

  const handleClauseClick = useCallback((clause: string) => {
    setSelectedClause(clause)
  }, [])

  const renderResult = useCallback(() => {
    if (!result) return null;
    return result.replace(
      /<span class='bg-yellow-200'>(.*?)<\/span>/g,
      (match, p1) => `<span class='bg-yellow-200 cursor-pointer' data-clause="${p1}">${p1}</span>`
    );
  }, [result]);

  return (
    <div className="h-full flex flex-col p-8">
      <h2 className="text-xl font-semibold mb-2">검토 결과</h2>
      {result ? (
        <div className="flex-grow flex flex-col">
          {!isExistingReview && (
            <div className="mb-2">
              <span className="font-semibold mr-2">등급:</span>
              <Badge variant="outline">{grade}</Badge>
            </div>
          )}
          <ScrollArea className="flex-grow border p-4 rounded mb-4">
            <p
              dangerouslySetInnerHTML={{ __html: renderResult() || '' }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'SPAN' && target.dataset.clause) {
                  handleClauseClick(target.dataset.clause);
                }
              }}
            />
          </ScrollArea>
          <p className="text-sm text-gray-500 mb-2">
            독소조항을 클릭하면 상세 정보를 확인할 수 있습니다.
          </p>
          {selectedClause && clauseDetails[selectedClause] && (
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">선택된 조항 상세 정보:</h3>
              <p className="font-medium">{selectedClause}</p>
              <p className="mt-2 text-sm text-gray-600">
                {clauseDetails[selectedClause]}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p>{isExistingReview ? "검토 결과를 불러오는 중..." : "검토 결과가 여기에 표시됩니다."}</p>
      )}
    </div>
  )
}
