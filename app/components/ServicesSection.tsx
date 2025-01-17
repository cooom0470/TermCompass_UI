import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, FileText, Bot } from 'lucide-react'
import { topWebsites } from "@/app/components/TopWebsites"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: '약관 검토',
    description: 'AI 기반 약관 분석으로 숨겨진 독소조항을 찾아냅니다.',
    icon: Search
  },
  {
    title: '사이트 등급',
    description: '주요 웹사이트의 약관을 평가하고 등급을 매깁니다.',
    icon: Shield
  },
  {
    title: '약관 생성',
    description: '기업을 위한 맞춤형 약관 생성 서비스를 제공합니다.',
    icon: FileText
  },
  {
    title: 'AI 챗봇',
    description: '약관 관련 질문에 즉시 답변해 드립니다.',
    icon: Bot
  }
]

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + slidesToShow;
      return newIndex < topWebsites.length ? newIndex : 0;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - slidesToShow;
      return newIndex >= 0 ? newIndex : topWebsites.length - 1;
    });
  };

  return (
    <section className="h-[calc(100vh-8rem)] py-4 bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 flex flex-col justify-between h-full">
        {/* h3와 맨 위, 슬라이드 카드 간격 동적 조정 */}
        <h3
          className="text-lg sm:text-2xl font-bold text-center flex-none"
          style={{
            paddingTop: 'calc(3vh)', // 맨 위 간격 동적 조정
            marginBottom: 'calc(4vh)', // 슬라이드 카드와의 간격 동적 조정
            fontSize: 'calc(1rem + 1vw)', // 화면 크기에 따라 폰트 크기 동적 조정
          }}
        >
          사이트들의 약관의 평가를 한눈에!
        </h3>

        {/* 슬라이드 카드 */}
        <div className="relative overflow-hidden flex-auto mb-6">
          <div
            className="flex transition-transform duration-500 gap-6 h-full"
            style={{
              transform: `translateX(-${(currentIndex / topWebsites.length) * 100}%)`,
            }}
          >
            {topWebsites.map((website, index) => (
              <div
                key={index}
                className="w-full md:w-1/3 flex-shrink-0 p-6 pl-12 border rounded-lg shadow-md bg-white h-full flex flex-col justify-between"
                style={{
                  height: 'calc(60vh)', // 슬라이드 카드의 높이 동적 설정
                }}
              >
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4"
                  style={{
                    marginBottom: 'calc(1vh)', // 로고와 사이트 이름 간격 동적 조정
                  }}
                >
                  <div className="w-full md:w-1/6">
                    <img
                      src="/TermCompass_logo.png"
                      alt="Example"
                      className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />
                  </div>
                  <div className="w-full md:w-3/4">
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontSize: 'calc(1rem + 0.5vw)', // 사이트 이름 폰트 크기 동적 조정
                      }}
                    >
                      {website.name}
                    </h3>
                  </div>
                </div>
                {/* 장점과 단점 섹션 */}
                <div
                  className="flex flex-col md:flex-row gap-2"
                  style={{
                    marginTop: 'calc(2vh)', // 장점/단점 간격 동적 조정
                    flexGrow: 1, // 섹션 높이가 부족할 때 유동적으로 커지도록 설정
                  }}
                >
                  <div className="w-full md:w-1/2">
                    <h4
                      className="text-lg font-semibold text-green-600"
                      style={{
                        fontSize: 'calc(1.5vw)', // 장점 제목 폰트 크기 동적 조정
                      }}
                    >
                      장점
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 pl-4">
                      {website.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 'calc(1vw)', // 장점 텍스트 폰트 크기 동적 조정
                          }}
                        >
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full md:w-1/2">
                    <h4
                      className="text-lg font-semibold text-red-600"
                      style={{
                        fontSize: 'calc(1.5vw)', // 단점 제목 폰트 크기 동적 조정
                      }}
                    >
                      단점
                    </h4>
                    <ul className="list-disc list-inside text-gray-700 pl-4">
                      {website.drawbacks.map((drawback, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 'calc(1vw)', // 단점 텍스트 폰트 크기 동적 조정
                          }}
                        >
                          {drawback}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            variant="outline"
            size="icon"
          >
            &lt;
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            variant="outline"
            size="icon"
          >
            &gt;
          </Button>
        </div>

        {/* 서비스 카드 */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-none"
          style={{
            marginBottom: `calc(0.5vh)`, // 동적 간격
            minHeight: 'calc(30vh)', // 최소 높이 설정
            maxHeight: 'calc(40vh)', // 최대 높이 설정
          }}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              className="h-full flex flex-col justify-between"
              style={{
                height: 'calc(25vh)', // 화면 높이에 따라 카드 높이 동적 설정
                minHeight: '200px', // 최소 높이 설정
                maxHeight: '300px', // 최대 높이 설정
              }}
            >
              <CardHeader>
                <div className="w-12 h-12 mb-4 text-blue-600">
                  <service.icon className="w-full h-full" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>


  );

}

