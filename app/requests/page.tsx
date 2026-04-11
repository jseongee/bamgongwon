import type { Metadata } from "next"
import { Suspense } from "react"
import { PlaylistSkeleton } from "@/components/requests/playlist-skeleton"
import { PlaylistBoardSection } from "./_components/playlist-board-section"

export const metadata: Metadata = {
  title: "신청 목록",
  description:
    "밤공원에 신청된 모든 플레이리스트 목록을 확인하고 좋아요를 눌러보세요.",
}

export default function Page() {
  return (
    <main>
      <Suspense fallback={<PlaylistSkeleton count={6} showFilters />}>
        <PlaylistBoardSection />
      </Suspense>
    </main>
  )
}
