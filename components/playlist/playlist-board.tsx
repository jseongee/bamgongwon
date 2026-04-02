"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { type Status } from "@/types/playlist";
import { DUMMY_REQUESTS } from "@/constants/playlist";
import { PlaylistCard, getStatusConfig } from "@/components/playlist/playlist-card";

export function PlaylistBoard() {
  const [filter, setFilter] = useState<Status | "all">("all");

  const filteredRequests =
    filter === "all"
      ? DUMMY_REQUESTS
      : DUMMY_REQUESTS.filter((r) => r.status === filter);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* 섹션 헤더 */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">신청 현황</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {DUMMY_REQUESTS.length}개의 신청이 있습니다.
          </p>
        </div>

        {/* 필터 탭 */}
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-muted/30 p-1 w-fit">
          {(["all", "adopted", "in_progress", "completed"] as const).map(
            (f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap",
                  filter === f
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f === "all" ? "전체" : getStatusConfig(f).label}
              </button>
            ),
          )}
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <PlaylistCard key={request.id} request={request} />
        ))}
      </div>
    </section>
  );
}
