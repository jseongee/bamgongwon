import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { type PlaylistRequest } from "@/types/playlist"
import { PlaylistCard } from "@/components/playlist/playlist-card"

export function PlaylistPreview({
  requests,
  userEmail,
}: {
  requests: PlaylistRequest[]
  userEmail?: string
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">신청 현황</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            최근 신청 {requests.length}건
          </p>
        </div>
        <Link
          href="/requests"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          전체 보기
          <ChevronRight className="size-4" />
        </Link>
      </div>

      {/* 카드 그리드 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <PlaylistCard
            key={request.id}
            request={request}
            userEmail={userEmail}
          />
        ))}
      </div>
    </section>
  )
}
