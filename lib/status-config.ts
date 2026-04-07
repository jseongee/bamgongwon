import { CheckCircle2, Clock, Loader2, Star } from "lucide-react"
import type { Status } from "@/types/playlist"

export function getStatusConfig(status: Status) {
  switch (status) {
    case "pending":
      return {
        label: "대기 중",
        icon: Clock,
        className: "text-slate-400 bg-slate-400/10 border-slate-400/20",
      }
    case "completed":
      return {
        label: "제작 완료",
        icon: CheckCircle2,
        className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      }
    case "in_progress":
      return {
        label: "제작 중",
        icon: Loader2,
        className:
          "text-red-400 bg-red-400/10 border-red-400/20 [&_svg]:animate-spin",
      }
    case "adopted":
      return {
        label: "채택됨",
        icon: Star,
        className: "text-amber-400 bg-amber-400/10 border-amber-400/20",
      }
  }
}
