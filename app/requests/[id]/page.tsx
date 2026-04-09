import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, SquarePlay } from "lucide-react"
import { fetchPlaylistRequestById } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { getStatusConfig } from "@/constants/status-config"
import { LikeButton } from "@/components/playlist/like-button"
import { RequestActions } from "@/components/playlist/request-actions"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) notFound()

  const [request, user] = await Promise.all([
    fetchPlaylistRequestById(numericId),
    getUser(),
  ])

  if (!request) notFound()

  const userEmail = user?.email
  const statusConfig = getStatusConfig(request.status)
  const StatusIcon = statusConfig.icon
  const isOwner = !!userEmail && userEmail === request.requester

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      {/* 뒤로가기 */}
      <Link
        href="/requests"
        className="mb-8 flex w-fit items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        신청 목록
      </Link>

      <article>
        {/* 상태 배지 + 좋아요 */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className={`flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium ${statusConfig.className}`}
          >
            <StatusIcon className="size-3" />
            {statusConfig.label}
          </span>
          <LikeButton
            requestId={request.id}
            initialCount={request.likes_count}
            initialLiked={request.is_liked}
            isLoggedIn={!!userEmail && userEmail !== request.requester}
          />
        </div>

        {/* 제목 */}
        <h1 className="mb-4 text-2xl font-semibold leading-snug text-foreground">
          {request.title}
        </h1>

        {/* 신청자/날짜 + 구분선 */}
        <div className="mb-6 flex items-center justify-between border-b border-border/50 pb-4">
          <div className="flex items-center gap-1.5">
            <div className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              {request.requester[0].toUpperCase()}
            </div>
            <span className="text-sm text-muted-foreground">
              {request.requester}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isOwner && (
              <RequestActions
                requestId={request.id}
                initialTitle={request.title}
                initialDescription={request.description}
              />
            )}
            <span className="text-xs text-muted-foreground">
              {new Date(request.requested_at).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* 설명 — 전체 내용 표시 */}
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {request.description}
        </p>

        {/* YouTube 링크 — 제작 완료 상태이고 URL이 있을 때만 표시 */}
        {request.status === "completed" && request.youtube_url && (
          <a
            href={request.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <SquarePlay className="size-4 text-red-500" />
            YouTube에서 보기
          </a>
        )}
      </article>
    </main>
  )
}
