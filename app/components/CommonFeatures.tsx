import { Button } from "@/components/ui/button"

interface CommonFeaturesProps {
  activeFeature: string | null
  setActiveFeature: (feature: string | null) => void
}

export default function CommonFeatures({ activeFeature, setActiveFeature }: CommonFeaturesProps) {
  const features = [
    { id: 'aiChatbot', name: 'AI 챗봇' },
    { id: 'siteRatings', name: '사이트별 등급과 독소 조항 요약 확인' },
  ]

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold">공통 기능</h2>
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

