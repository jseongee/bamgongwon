import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, SquarePlay } from "lucide-react"
import { cache } from "react"
import { fetchPlaylistRequestById } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { getStatusConfig } from "@/constants/status-config"
import { LikeButton } from "@/components/playlist/like-button"
import { RequestActions } from "@/components/playlist/request-actions"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// 요청 범위 내 캐싱 — generateMetadata와 Page가 DB 중복 호출 없이 공유
const getRequest = cache((id: number) => fetchPlaylistRequestById(id))

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) return { title: "신청 상세" }

  const request = await getRequest(numericId)
  if (!request) return { title: "신청을 찾을 수 없습니다." }

  const desc =
    request.description.length > 160
      ? request.description.slice(0, 157) + "..."
      : request.description

  return {
    title: request.title,
    description: desc,
    openGraph: {
      title: request.title,
      description: desc,
      url: `/requests/${request.id}`,
    },
    twitter: {
      title: request.title,
      description: desc,
    },
  }
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Seoul",
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  if (isNaN(numericId)) notFound()

  const [request, user] = await Promise.all([getRequest(numericId), getUser()])

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
            isOwner={isOwner}
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
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span>{formatDateTime(request.requested_at)}</span>
              {request.updated_at && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-default">(수정됨)</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>수정: {formatDateTime(request.updated_at)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
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
