export function RequestCardSkeleton({
  count = 3,
  showFilters = false,
}: {
  count?: number
  showFilters?: boolean
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-7 w-24 rounded-md bg-muted animate-pulse" />
          <div className="mt-1 h-4 w-32 rounded-md bg-muted animate-pulse" />
        </div>
        {showFilters && (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="h-8 w-32 rounded-lg bg-muted animate-pulse" />
            <div className="h-8 w-64 rounded-lg bg-muted animate-pulse" />
          </div>
        )}
      </div>

      {/* 카드 그리드 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    </section>
  )
}
