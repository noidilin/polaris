'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleBlocking = async () => {
    setIsLoading(true)
    await fetch('/api/demo/blocking', { method: 'POST' })
    setIsLoading(false)
  }

  const handleBackground = async () => {
    setIsLoading(true)
    await fetch('/api/demo/background', { method: 'POST' })
    setIsLoading(false)
  }

  return (
    <div className="space-x-4 p-8">
      <Button disabled={isLoading} onClick={handleBlocking}>
        {isLoading ? 'Loading' : 'Blocking'}
      </Button>

      <Button disabled={isLoading} onClick={handleBackground}>
        {isLoading ? 'Loading' : 'Background'}
      </Button>
    </div>
  )
}
