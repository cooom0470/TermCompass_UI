import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Search, FileText, Bot } from 'lucide-react'
import TopWebsites from "@/app/components/TopWebsites";
import {topWebsites} from "@/app/components/TopWebsites";

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
  return (
    <section className="h-full py-16 bg-gray-100 flex items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-20">
          사이트들의 약관을 한번에 평가하세요!!
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {topWebsites.map((website, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{website.name}</h3>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-green-600 text-left ml-10 ">장점</h4>
                    <ul className="list-disc list-inside text-gray-700 text-base text-left ml-10">
                      {website.benefits.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-red-600 text-left ml-10">단점</h4>
                    <ul className="list-disc list-inside text-gray-700 text-gray-700 text-base text-left ml-10">
                      {website.drawbacks.map((drawback, i) => (
                          <li key={i}>{drawback}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                      href={website.link}
                      className="inline-block bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                  >
                    사이트 분석
                  </a>
                </div>
            ))}
          </div>
        </h1>
        <h2 className="text-3xl font-bold text-center mb-8">약관나침반 서비스</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => (
              <Card key={index} className="mb-20">
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

