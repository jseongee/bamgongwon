import Link from "next/link"
import { cn } from "@/lib/utils"
import { type PlaylistRequest } from "@/types/playlist"
import { getStatusConfig } from "@/constants/status-config"
import { RequestActions } from "@/components/requests/request-actions"
import { LikeButton } from "@/components/requests/like-button"

export function PlaylistCard({
  request,
  userEmail,
}: {
  request: PlaylistRequest
  userEmail?: string
}) {
  const statusConfig = getStatusConfig(request.status)
  const StatusIcon = statusConfig.icon
  const isOwner = !!userEmail && userEmail === request.requester

  return (
    <div
      style={{ viewTransitionName: `card-${request.id}` }}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-border/80 hover:bg-card/80 hover:scale-[1.01] hover:shadow-glow-sm"
    >
      {/* 상단: 상태 뱃지 + 좋아요 */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
            statusConfig.className,
          )}
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

      {/* 제목 + 설명 */}
      <Link href={`/requests/${request.id}`} className="flex-1 group/link">
        <h3 className="font-medium leading-snug text-foreground line-clamp-2 group-hover/link:underline underline-offset-2">
          {request.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {request.description}
        </p>
      </Link>

      {/* 하단: 신청자 + 날짜 + 수정/삭제 버튼 */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-semibold">
            {request.requester[0].toUpperCase()}
          </div>
          <span className="text-xs text-muted-foreground">
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
              timeZone: "Asia/Seoul",
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
