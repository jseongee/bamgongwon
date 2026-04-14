import { ChevronLeft } from "lucide-react"

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      {/* 뒤로가기 */}
      <div className="mb-8 flex w-fit items-center gap-1 text-sm text-muted-foreground">
        <ChevronLeft className="size-4" />
        신청 목록
      </div>

      <article>
        {/* 상태 배지 + 좋아요 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="h-5 w-16 rounded-md bg-muted animate-pulse" />
          <div className="h-8 w-16 rounded-md bg-muted animate-pulse" />
        </div>

        {/* 제목 */}
        <div className="mb-4 space-y-2">
          <div className="h-7 w-3/4 rounded-md bg-muted animate-pulse" />
          <div className="h-7 w-1/2 rounded-md bg-muted animate-pulse" />
        </div>

        {/* 신청자/날짜 */}
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-1.5">
            <div className="size-6 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-28 rounded-md bg-muted animate-pulse" />
          </div>
          <div className="h-4 w-32 rounded-md bg-muted animate-pulse" />
        </div>

        {/* 설명 */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-4/5 rounded-md bg-muted animate-pulse" />
          <div className="h-4 w-3/4 rounded-md bg-muted animate-pulse" />
        </div>
      </article>
    </main>
  )
}
