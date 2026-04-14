"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { PlaylistRequest } from "@/types/request"
import { RequestCard } from "@/components/requests/request-card"

type Tab = "written" | "liked"

export function MyBoard({
  userEmail,
  writtenRequests,
  likedRequests,
}: {
  userEmail: string
  writtenRequests: PlaylistRequest[]
  likedRequests: PlaylistRequest[]
}) {
  const [tab, setTab] = useState<Tab>("written")

  const requests = tab === "written" ? writtenRequests : likedRequests

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">내 활동</h2>
          <p className="mt-1 text-sm text-muted-foreground">{userEmail}</p>
        </div>

        {/* 탭 */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
          {(
            [
              { key: "written", label: "내가 쓴 글" },
              { key: "liked", label: "좋아요한 글" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer",
                tab === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 카드 그리드 */}
      {requests.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {tab === "written" ? "아직 신청한 글이 없습니다." : "좋아요한 글이 없습니다."}
          </p>
          <Link
            href={tab === "written" ? "/requests/new" : "/requests"}
            className="text-sm font-medium underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            {tab === "written" ? "첫 번째 신청 남기기 →" : "신청 목록 둘러보기 →"}
          </Link>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <RequestCard
              key={request.id}
              request={request}
              userEmail={userEmail}
            />
          ))}
        </div>
      )}
    </section>
  )
}
