import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative h-[500px] flex items-center justify-center text-gray">
      <Image
        src="/herobackground.jpg?height=500&width=1200&text=TermCompass Hero Image"
        alt="TermCompass Hero Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="z-10 text-center">
        <h1 className="text-4xl font-bold mb-4">약관의 미래, 약관나침반과 함께</h1>
        <p className="text-xl">AI 기반 약관 분석으로 더 나은 디지털 경험을 만듭니다</p>
      </div>
    </div>
  )
}

