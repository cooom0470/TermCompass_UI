import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const domains = [
  '전자상거래',
  '소프트웨어 서비스',
  '온라인 교육',
  '여행 서비스',
  '금융 서비스',
  '헬스케어',
  '소셜 미디어',
  '콘텐츠 스트리밍',
  '온라인 마켓플레이스',
  '배달 서비스',
]

interface DomainSelectionProps {
  onSelect: (domain: string) => void
}

export default function DomainSelection({ onSelect }: DomainSelectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">도메인 선택</h2>
      <p className="mb-4">귀하의 웹 서비스에 가장 적합한 도메인을 선택해주세요:</p>
      <ScrollArea className="h-[300px] border p-4 rounded">
        {domains.map((domain) => (
          <Button
            key={domain}
            onClick={() => onSelect(domain)}
            variant="outline"
            className="w-full mb-2"
          >
            {domain}
          </Button>
        ))}
      </ScrollArea>
    </div>
  )
}

