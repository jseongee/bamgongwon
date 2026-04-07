import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

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
