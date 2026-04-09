import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import {
  fetchUserPlaylistRequests,
  fetchUserLikedRequests,
} from "@/lib/supabase/queries"
import { MyBoard } from "@/components/me/my-board"

export const metadata: Metadata = {
  title: "내 활동",
  description: "내가 신청하거나 좋아요한 플레이리스트를 확인하세요.",
  robots: { index: false, follow: false },
}

export default async function MePage() {
  const user = await getUser()
  if (!user?.email) redirect("/")

  const [writtenRequests, likedRequests] = await Promise.all([
    fetchUserPlaylistRequests(user.email),
    fetchUserLikedRequests(user.email),
  ])

  return (
    <main>
      <MyBoard
        userEmail={user.email}
        writtenRequests={writtenRequests}
        likedRequests={likedRequests}
      />
    </main>
  )
}
