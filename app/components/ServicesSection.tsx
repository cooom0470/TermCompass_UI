import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, FileText, Bot } from 'lucide-react'
import TopWebsites from "@/app/components/TopWebsites";
import {topWebsites} from "@/app/components/TopWebsites";
import { useState } from "react";

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
      return newIndex >= 0 ? newIndex : Math.max(topWebsites.length - slidesToShow, 0);
    });
  };

  return (
    <section className="h-full py-16 bg-gray-100 flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          사이트들의 약관의 평가를 한눈에!!
          <div className="py-12">
            <div className="relative overflow-hidden">
              {/* 슬라이드 컨테이너 */}
              <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${(currentIndex / topWebsites.length) * 100}%)`,
                  }}
              >
                {topWebsites.map((website, index) => (
                    <div
                        key={index}
                        className="w-1/3 flex-shrink-0 p-4 border rounded-lg shadow-md"

                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-4 mb-4">
                        <div className="w-full md:w-1/5 ">
                          <img
                              src="/TermCompass_logo.png"
                              alt="Example"
                              className="w-full h-auto rounded-lg shadow-lg object-cover"
                          />
                        </div>
                        <div className="w-full text-left">
                          <h3 className="text-xl font-bold mb-2">{website.name}</h3>
                        </div>

                      </div>

                      <h4 className="text-3xl text-left ml-5 font-semibold text-green-600 ">장점</h4>
                      <ul className="text-xl text-left ml-9 list-disc list-inside text-gray-700">
                        {website.benefits.map((benefit, i) => (
                            <li key={i}>{benefit}</li>
                        ))}
                      </ul>
                      <h4 className="text-3xl text-left ml-5 font-semibold text-red-600 mt-4">단점</h4>
                      <ul className="text-xl text-left ml-9 list-disc list-inside text-gray-700">
                      {website.drawbacks.map((drawback, i) => (
                            <li key={i}>{drawback}</li>
                        ))}
                      </ul>
                    </div>
                ))}
              </div>
              <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                &gt;
              </button>

            </div>
          </div>
        </h1>
        <h2 className="text-3xl font-bold text-center mb-8">약관나침반 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <service.icon className="w-12 h-12 mb-4 text-blue-600"/>
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
  )
}

