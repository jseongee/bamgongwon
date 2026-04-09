import { redirect } from "next/navigation"
import { getUser } from "@/lib/supabase/server"
import {
  fetchUserPlaylistRequests,
  fetchUserLikedRequests,
} from "@/lib/supabase/queries"
import { MyBoard } from "@/components/playlist/my-board"

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
