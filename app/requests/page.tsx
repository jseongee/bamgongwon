import type { Metadata } from "next"
import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

export const metadata: Metadata = {
  title: "신청 목록",
  description:
    "밤공원에 신청된 모든 플레이리스트 목록을 확인하고 좋아요를 눌러보세요.",
}

export default async function Page() {
  const [requests, user] = await Promise.all([
    fetchPlaylistRequests(),
    getUser(),
  ])

  return (
    <main>
      <PlaylistBoard requests={requests} userEmail={user?.email} />
    </main>
  )
}
