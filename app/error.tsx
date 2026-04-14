"use client"

import Link from "next/link"
import { ChevronLeft, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
      <p className="mb-4 text-4xl font-bold text-muted-foreground/30">500</p>
      <h2 className="mb-2 text-lg font-semibold">오류가 발생했습니다.</h2>
      <p className="mb-8 text-sm text-muted-foreground">
        일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
      </p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={unstable_retry}>
          <RotateCcw className="size-4" />
          다시 시도
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ChevronLeft className="size-4" />
            홈으로
          </Link>
        </Button>
      </div>
    </main>
  )
}
