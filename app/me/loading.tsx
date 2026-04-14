export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-7 w-20 rounded-md bg-muted animate-pulse" />
          <div className="mt-1 h-4 w-40 rounded-md bg-muted animate-pulse" />
        </div>
        {/* 탭 */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
          <div className="h-6 w-16 rounded-md bg-muted animate-pulse" />
          <div className="h-6 w-20 rounded-md bg-muted animate-pulse" />
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </section>
  )
}
