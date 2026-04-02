import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Music, Star } from "lucide-react";
import { type Status, type PlaylistRequest } from "@/types/playlist";

export function PlaylistCard({ request }: { request: PlaylistRequest }) {
  const statusConfig = getStatusConfig(request.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border/80 hover:bg-card/80">
      {/* 상단: 음악 아이콘 + 상태 뱃지 */}
      <div className="flex items-center justify-between">
        <div className="flex size-7 items-center justify-center rounded-lg bg-muted/50 border border-border">
          <Music className="size-3.5 text-muted-foreground" />
        </div>
        <span
          className={cn(
            "flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
            statusConfig.className,
          )}
        >
          <StatusIcon className="size-3" />
          {statusConfig.label}
        </span>
      </div>

      {/* 제목 + 설명 */}
      <div className="flex-1">
        <h3 className="font-medium leading-snug text-foreground line-clamp-2">
          {request.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {request.description}
        </p>
      </div>

      {/* 하단: 신청자 + 날짜 */}
      <div className="flex items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-1.5">
          <div className="size-5 rounded-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-semibold">
            {request.requester[3]}
          </div>
          <span className="text-xs text-muted-foreground">
            {request.requester}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {request.requestedAt}
        </span>
      </div>
    </div>
  );
}

export function getStatusConfig(status: Status) {
  switch (status) {
    case "completed":
      return {
        label: "제작 완료",
        icon: CheckCircle2,
        className: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      };
    case "in_progress":
      return {
        label: "제작 중",
        icon: Loader2,
        className:
          "text-blue-400 bg-blue-400/10 border-blue-400/20 [&_svg]:animate-spin",
      };
    case "adopted":
      return {
        label: "채택됨",
        icon: Star,
        className: "text-violet-400 bg-violet-400/10 border-violet-400/20",
      };
  }
}
