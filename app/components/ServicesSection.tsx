import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Search, FileText, Bot } from 'lucide-react';
import { topWebsites } from "@/app/components/TopWebsites";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { useUser } from '@/app/contexts/UserContext';
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    title: '약관 검토',
    description: 'AI 기반 약관 분석으로 숨겨진 독소조항을 찾아냅니다.',
    icon: Search,
    url: '/review-request'
  },
  {
    title: '사이트 등급',
    description: '주요 웹사이트의 약관을 평가하고 등급을 매깁니다.',
    icon: Shield,
    url: '/site-analysis'
  },
  {
    title: '약관 생성',
    description: '기업을 위한 맞춤형 약관 생성 서비스를 제공합니다.',
    icon: FileText,
    url: '/create-terms'
  },
  {
    title: 'AI 챗봇',
    description: '약관 관련 질문에 즉시 답변해 드립니다.',
    icon: Bot,
    url: '/ai-chatbot'
  }
];

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 3;
  const { user } = useUser();
  const { toast } = useToast();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + slidesToShow;
      return newIndex < topWebsites.length * 3 - 4 ? newIndex : 0;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - slidesToShow;
      return newIndex >= 0 ? newIndex : topWebsites.length * 3 - 4 - slidesToShow;
    });
  };

  const handleCardClick = (e: React.MouseEvent, url: string) => {
    if (url === '/create-terms' && (!user || user.userType !== 'COMPANY')) {
      e.preventDefault();
      toast({
        title: "접근 제한",
        description: "이 기능은 기업 사용자 전용입니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="h-screen py-4 bg-gray-100 flex flex-col overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col h-full">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
          사이트들의 약관의 평가를 한눈에!
        </h3>

        <div className="relative h-[35%] mb-6">
          <div
            className="flex transition-transform duration-500 h-full"
            style={{
              transform: `translateX(-${(currentIndex / topWebsites.length) * 100}%)`,
            }}
          >
            {topWebsites.map((website, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 p-4 border rounded-lg shadow-md bg-white mx-2"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10">
                    <img
                      src="/TermCompass_logo.png"
                      alt="Example"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                  <h3 className="text-base font-bold">
                    {website.name}
                  </h3>
                </div>
                <div
                  className="flex flex-col md:flex-row gap-2"
                  style={{
                    marginTop: 'calc(2vh)',
                    flexGrow: 1,
                  }}
                >
                  <div className="w-full md:w-1/2">
                    <h4
                      className="text-lg font-semibold text-green-600"
                      style={{
                        fontSize: 'calc(1.5vw)',
                      }}
                    >
                      장점
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {website.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 'calc(1vw)',
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
                        fontSize: 'calc(1.5vw)',
                      }}
                    >
                      단점
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {website.drawbacks.map((drawback, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 'calc(1vw)',
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
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            variant="outline"
            size="icon"
          >
            &lt;
          </Button>
          <Button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            variant="outline"
            size="icon"
          >
            &gt;
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[45%]">
          {services.map((service, index) => (
            <Link href={service.url} key={index} legacyBehavior>
              <a 
                onClick={(e) => handleCardClick(e, service.url)} 
                className="h-full"
              >
                <div className="flip-card h-full">
                  <div className="flip-card-inner">
                    <Card className="flip-card-front h-full flex flex-col items-center justify-center p-4">
                      <div className="w-12 h-12 mb-3 text-blue-600">
                        <service.icon className="w-full h-full" />
                      </div>
                      <CardTitle className="text-base lg:text-lg text-center mb-2">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-center">
                        {service.description}
                      </CardDescription>
                    </Card>
                    <Card className="flip-card-back h-full flex flex-col justify-center items-center p-4">
                      <CardDescription className="text-sm text-center">
                        {service.description}
                      </CardDescription>
                    </Card>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}