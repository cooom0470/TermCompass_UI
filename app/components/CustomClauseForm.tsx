import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"

interface CustomClauseFormProps {
  onAdd: (clause: string) => void
  onFinish: () => void
  clauses: string[]
}

export default function CustomClauseForm({ onAdd, onFinish, clauses }: CustomClauseFormProps) {
  const [newClause, setNewClause] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newClause.trim()) {
      onAdd(newClause.trim())
      setNewClause('')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">사용자 요청 조항 추가</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            value={newClause}
            onChange={(e) => setNewClause(e.target.value)}
            placeholder="추가할 조항을 입력하세요..."
            className="flex-grow"
          />
          <Button type="submit">추가</Button>
        </div>
      </form>
      <ScrollArea className="h-[200px] border p-4 rounded mb-4">
        {clauses.map((clause, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {clause}
          </div>
        ))}
      </ScrollArea>
      <Button onClick={onFinish}>완료</Button>
    </div>
  )
}

