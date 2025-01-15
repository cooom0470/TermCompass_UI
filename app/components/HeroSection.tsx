import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-gray">
      <Image
        src="/herobackground.jpg"
        alt="TermCompass Hero Image"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="z-10 text-center bg-white bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">약관의 미래, 약관나침반과 함께</h1>
        <p className="text-xl">AI 기반 약관 분석으로 더 나은 디지털 경험을 만듭니다</p>
      </div>
    </section>
  )
}

