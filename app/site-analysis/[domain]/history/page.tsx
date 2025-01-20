'use client'

import { useParams, useRouter } from 'next/navigation'
import Layout from '../../../components/Layout'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const dummyGradeHistory = {
  'naver.com': [
    { version: '3.0', date: '2023-06-01', grade: 'A', change: 'up' },
    { version: '2.5', date: '2022-12-15', grade: 'B', change: 'same' },
    { version: '2.0', date: '2022-06-30', grade: 'B', change: 'up' },
    { version: '1.5', date: '2021-12-01', grade: 'C', change: 'down' },
    { version: '1.0', date: '2021-06-01', grade: 'B', change: 'initial' },
  ],
  'kakao.com': [
    { version: '4.0', date: '2023-05-15', grade: 'B', change: 'up' },
    { version: '3.5', date: '2022-11-30', grade: 'C', change: 'same' },
    { version: '3.0', date: '2022-06-01', grade: 'C', change: 'down' },
    { version: '2.5', date: '2021-12-15', grade: 'B', change: 'up' },
    { version: '2.0', date: '2021-06-15', grade: 'C', change: 'initial' },
  ],
  'coupang.com': [
    { version: '5.0', date: '2023-06-10', grade: 'B', change: 'same' },
    { version: '4.5', date: '2022-12-01', grade: 'B', change: 'up' },
    { version: '4.0', date: '2022-06-15', grade: 'C', change: 'same' },
    { version: '3.5', date: '2021-12-10', grade: 'C', change: 'down' },
    { version: '3.0', date: '2021-06-20', grade: 'B', change: 'initial' },
  ],
  '11st.co.kr': [
    { version: '3.5', date: '2023-05-20', grade: 'B', change: 'same' },
    { version: '3.0', date: '2022-11-15', grade: 'B', change: 'up' },
    { version: '2.5', date: '2022-05-30', grade: 'C', change: 'same' },
    { version: '2.0', date: '2021-11-30', grade: 'C', change: 'down' },
    { version: '1.5', date: '2021-06-10', grade: 'B', change: 'initial' },
  ],
  'yogiyo.co.kr': [
    { version: '2.5', date: '2023-06-05', grade: 'C', change: 'up' },
    { version: '2.0', date: '2022-12-10', grade: 'D', change: 'same' },
    { version: '1.5', date: '2022-06-25', grade: 'D', change: 'down' },
    { version: '1.0', date: '2021-12-20', grade: 'C', change: 'initial' },
  ],
  'gmarket.co.kr': [
    { version: '4.5', date: '2023-06-15', grade: 'B', change: 'up' },
    { version: '4.0', date: '2022-12-05', grade: 'C', change: 'same' },
    { version: '3.5', date: '2022-06-20', grade: 'C', change: 'down' },
    { version: '3.0', date: '2021-12-10', grade: 'B', change: 'up' },
    { version: '2.5', date: '2021-06-05', grade: 'C', change: 'initial' },
  ],
  'baemin.com': [
    { version: '3.0', date: '2023-05-25', grade: 'B', change: 'same' },
    { version: '2.5', date: '2022-11-20', grade: 'B', change: 'up' },
    { version: '2.0', date: '2022-05-15', grade: 'C', change: 'same' },
    { version: '1.5', date: '2021-11-10', grade: 'C', change: 'down' },
    { version: '1.0', date: '2021-05-05', grade: 'B', change: 'initial' },
  ],
  'tmon.co.kr': [
    { version: '3.5', date: '2023-06-20', grade: 'C', change: 'up' },
    { version: '3.0', date: '2022-12-15', grade: 'D', change: 'same' },
    { version: '2.5', date: '2022-06-10', grade: 'D', change: 'down' },
    { version: '2.0', date: '2021-12-05', grade: 'C', change: 'same' },
    { version: '1.5', date: '2021-06-01', grade: 'C', change: 'initial' },
  ],
  'wemakeprice.com': [
    { version: '4.0', date: '2023-05-30', grade: 'C', change: 'up' },
    { version: '3.5', date: '2022-11-25', grade: 'D', change: 'same' },
    { version: '3.0', date: '2022-05-20', grade: 'D', change: 'down' },
    { version: '2.5', date: '2021-11-15', grade: 'C', change: 'same' },
    { version: '2.0', date: '2021-05-10', grade: 'C', change: 'initial' },
  ],
  'daangn.com': [
    { version: '2.5', date: '2023-06-25', grade: 'B', change: 'up' },
    { version: '2.0', date: '2022-12-20', grade: 'C', change: 'same' },
    { version: '1.5', date: '2022-06-15', grade: 'C', change: 'down' },
    { version: '1.0', date: '2021-12-10', grade: 'B', change: 'initial' },
  ],
  'interpark.com': [
    { version: '5.0', date: '2023-06-05', grade: 'B', change: 'same' },
    { version: '4.5', date: '2022-12-01', grade: 'B', change: 'up' },
    { version: '4.0', date: '2022-05-25', grade: 'C', change: 'same' },
    { version: '3.5', date: '2021-11-20', grade: 'C', change: 'down' },
    { version: '3.0', date: '2021-05-15', grade: 'B', change: 'initial' },
  ],
  'lotteon.com': [
    { version: '2.5', date: '2023-05-10', grade: 'B', change: 'up' },
    { version: '2.0', date: '2022-11-05', grade: 'C', change: 'same' },
    { version: '1.5', date: '2022-05-01', grade: 'C', change: 'down' },
    { version: '1.0', date: '2021-10-25', grade: 'B', change: 'initial' },
  ],
  'bunjang.co.kr': [
    { version: '3.0', date: '2023-06-30', grade: 'C', change: 'up' },
    { version: '2.5', date: '2022-12-25', grade: 'D', change: 'same' },
    { version: '2.0', date: '2022-06-20', grade: 'D', change: 'down' },
    { version: '1.5', date: '2021-12-15', grade: 'C', change: 'same' },
    { version: '1.0', date: '2021-06-10', grade: 'C', change: 'initial' },
  ],
  'yanolja.com': [
    { version: '4.0', date: '2023-05-05', grade: 'B', change: 'up' },
    { version: '3.5', date: '2022-11-01', grade: 'C', change: 'same' },
    { version: '3.0', date: '2022-04-25', grade: 'C', change: 'down' },
    { version: '2.5', date: '2021-10-20', grade: 'B', change: 'up' },
    { version: '2.0', date: '2021-04-15', grade: 'C', change: 'initial' },
  ],
  'goodchoice.kr': [
    { version: '3.5', date: '2023-06-15', grade: 'B', change: 'same' },
    { version: '3.0', date: '2022-12-10', grade: 'B', change: 'up' },
    { version: '2.5', date: '2022-06-05', grade: 'C', change: 'same' },
    { version: '2.0', date: '2021-12-01', grade: 'C', change: 'down' },
    { version: '1.5', date: '2021-05-25', grade: 'B', change: 'initial' },
  ],
}

export default function GradeHistory() {
  const params = useParams()
  const router = useRouter()
  const domain = params.domain as string
  const history = dummyGradeHistory[domain]

  if (!history) {
    return <div>History not found</div>
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">{domain} 등급 판정 이력</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>버전</TableHead>
                <TableHead>변경 일자</TableHead>
                <TableHead>등급</TableHead>
                <TableHead>변화</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.version}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.grade}</TableCell>
                  <TableCell>
                    {item.change === 'up' && '▲'}
                    {item.change === 'down' && '▼'}
                    {item.change === 'same' && '─'}
                    {item.change === 'initial' && '초기'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button className="bg-black text-white hover:bg-blue-600" onClick={() => router.back()}>
          현재 버전 평가로 돌아가기
        </Button>
      </div>
    </Layout>
  )
}

