import { ScrollArea } from "@/components/ui/scroll-area"

interface OriginalDocumentProps {
  reviewId: number;
}

export default function OriginalDocument({ reviewId }: OriginalDocumentProps) {
  // In a real application, you would fetch the original document based on the reviewId
  const dummyContent = "이것은 선택된 리뷰의 원본 약관 내용입니다. 실제 구현에서는 서버에서 가져온 데이터를 표시해야 합니다."

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2">원본 약관</h2>
      <ScrollArea className="flex-grow border p-4 rounded">
        <p>{dummyContent}</p>
      </ScrollArea>
    </div>
  )
}
