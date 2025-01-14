'use client'

import { useParams, useRouter } from 'next/navigation'
import Layout from '../../components/Layout'
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
  // Add more sites as needed
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
      <div className="max-w-4xl mx-auto">
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
        <Button onClick={() => router.push(`/site-evaluation/${domain}`)}>
          현재 버전 평가로 돌아가기
        </Button>
      </div>
    </Layout>
  )
}

