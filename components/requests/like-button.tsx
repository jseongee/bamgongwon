"use client"

import { useOptimistic, useTransition, useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { toggleLike } from "@/app/_actions/request"

interface LikeButtonProps {
  requestId: number
  initialCount: number
  initialLiked: boolean
  isLoggedIn: boolean
  isOwner?: boolean
}

export function LikeButton({
  requestId,
  initialCount,
  initialLiked,
  isLoggedIn,
  isOwner,
}: LikeButtonProps) {
  const [optimistic, setOptimistic] = useOptimistic(
    { count: initialCount, liked: initialLiked },
    (state, nextLiked: boolean) => ({
      count: state.count + (nextLiked ? 1 : -1),
      liked: nextLiked,
    }),
  )
  const [isPending, startTransition] = useTransition()

  if (isOwner) {
    return (
      <LikeButtonDisabled
        count={optimistic.count}
        message="내 글에는 좋아요를 누를 수 없어요!"
        duration={2000}
        cursor="not-allowed"
      />
    )
  }

  if (!isLoggedIn) {
    return (
      <LikeButtonDisabled
        count={optimistic.count}
        message="좋아요를 누르려면 로그인이 필요해요!"
        duration={3000}
        cursor="pointer"
      />
    )
  }

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          setOptimistic(!optimistic.liked)
          await toggleLike(requestId)
        })
      }}
      disabled={isPending}
      className={cn(
        "flex items-center cursor-pointer gap-1 text-xs transition-all active:scale-90",
        optimistic.liked
          ? "text-fuchsia-400"
          : "text-muted-foreground hover:text-fuchsia-400",
      )}
    >
      <Heart
        className={cn(
          "size-3 transition-all duration-200",
          optimistic.liked &&
            "fill-current drop-shadow-[0_0_6px_oklch(0.65_0.28_320/0.9)]",
        )}
      />
      {optimistic.count}
    </button>
  )
}

// 클릭 시 메시지 팝오버를 표시하는 비활성 좋아요 버튼
function LikeButtonDisabled({
  count,
  message,
  duration,
  cursor,
}: {
  count: number
  message: string
  duration: number
  cursor: "not-allowed" | "pointer"
}) {
  const [showMsg, setShowMsg] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowMsg(true)
          setTimeout(() => setShowMsg(false), duration)
        }}
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground",
          cursor === "not-allowed" ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        <Heart className="size-3" />
        {count}
      </button>
      {showMsg && (
        <div className="absolute right-0 top-full mt-1 z-10 whitespace-nowrap rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md">
          {message}
        </div>
      )}
    </div>
  )
}
