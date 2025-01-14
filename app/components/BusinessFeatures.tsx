import { Button } from "@/components/ui/button"

interface BusinessFeaturesProps {
  activeFeature: string | null
  setActiveFeature: (feature: string | null) => void
}

export default function BusinessFeatures({ activeFeature, setActiveFeature }: BusinessFeaturesProps) {
  const features = [
    { id: 'createStandardTerms', name: '표준 약관 생성 요청' },
    { id: 'addCustomClauses', name: '사용자 요청 조항 추가 및 약관 분석' },
    { id: 'reviewTerms', name: '약관 검토 요청' },
    { id: 'modifyTerms', name: '약관 수정 및 저장' },
    { id: 'viewHistory', name: '이용 내역 보기' },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">기업 사용자 전용 기능</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <Button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id)}
            variant={activeFeature === feature.id ? "default" : "outline"}
          >
            {feature.name}
          </Button>
        ))}
      </div>
      {activeFeature && (
        <div className="mt-4 p-4 border rounded">
          {/* 여기에 각 기능에 대한 구체적인 UI를 구현합니다 */}
          <h3 className="text-xl font-bold mb-2">{features.find(f => f.id === activeFeature)?.name}</h3>
          <p>이 기능은 아직 구현되지 않았습니다.</p>
        </div>
      )}
    </div>
  )
}

