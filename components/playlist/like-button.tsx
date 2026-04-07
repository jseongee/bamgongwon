"use client"

import { useOptimistic, useTransition } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { toggleLike } from "@/app/actions/request"

interface LikeButtonProps {
  requestId: number
  initialCount: number
  initialLiked: boolean
  isLoggedIn: boolean
}

export function LikeButton({
  requestId,
  initialCount,
  initialLiked,
  isLoggedIn,
}: LikeButtonProps) {
  const [optimistic, setOptimistic] = useOptimistic(
    { count: initialCount, liked: initialLiked },
    (state, nextLiked: boolean) => ({
      count: state.count + (nextLiked ? 1 : -1),
      liked: nextLiked,
    }),
  )
  const [isPending, startTransition] = useTransition()

  if (!isLoggedIn) {
    return (
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Heart className="size-3" />
        {optimistic.count}
      </span>
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
        "flex items-center cursor-pointer gap-1 text-xs transition-colors",
        optimistic.liked
          ? "text-fuchsia-400"
          : "text-muted-foreground hover:text-fuchsia-400",
      )}
    >
      <Heart className={cn("size-3", optimistic.liked && "fill-current")} />
      {optimistic.count}
    </button>
  )
}
