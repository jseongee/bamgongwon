import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

export async function PlaylistBoardSection() {
  const [requests, user] = await Promise.all([
    fetchPlaylistRequests(),
    getUser(),
  ])
  return <PlaylistBoard requests={requests} userEmail={user?.email} />
}
