"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import { cn } from "@/lib/utils"
import { type Status, type PlaylistRequest } from "@/types/request"
import { RequestCard } from "@/components/requests/request-card"
import { getStatusConfig } from "@/constants/status-config"

export function RequestBoard({
  requests,
  userEmail,
}: {
  requests: PlaylistRequest[]
  userEmail?: string
}) {
  const [filter, setFilter] = useState<Status | "all">("all")
  const [sort, setSort] = useState<"latest" | "popular">("latest")

  const filteredRequests = (
    filter === "all" ? requests : requests.filter((r) => r.status === filter)
  ).sort((a, b) =>
    sort === "latest"
      ? new Date(b.requested_at).getTime() - new Date(a.requested_at).getTime()
      : b.likes_count - a.likes_count,
  )

  const handleFilterChange = (newFilter: Status | "all") => {
    if (!document.startViewTransition) {
      setFilter(newFilter)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setFilter(newFilter))
    })
  }

  const handleSortChange = (newSort: "latest" | "popular") => {
    if (!document.startViewTransition) {
      setSort(newSort)
      return
    }
    document.startViewTransition(() => {
      flushSync(() => setSort(newSort))
    })
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">신청 목록</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {requests.length}개의 신청이 있습니다.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          {/* 정렬 토글 */}
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
            {(["latest", "popular"] as const).map((s) => (
              <button
                key={s}
                onClick={() => handleSortChange(s)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer",
                  sort === s
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {s === "latest" ? "최신순" : "좋아요순"}
              </button>
            ))}
          </div>
          {/* 필터 탭 */}
          <div className="overflow-x-auto">
            <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
              {(
                [
                  "all",
                  "pending",
                  "adopted",
                  "in_progress",
                  "completed",
                ] as const
              ).map((f) => (
                <button
                  key={f}
                  onClick={() => handleFilterChange(f)}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer",
                    filter === f
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f === "all" ? "전체" : getStatusConfig(f).label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            userEmail={userEmail}
          />
        ))}
      </div>
    </section>
  )
}
