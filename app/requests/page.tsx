import { fetchPlaylistRequests, fetchUserEmail } from "@/lib/supabase/queries"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

export default async function Page() {
  const [requests, userEmail] = await Promise.all([
    fetchPlaylistRequests(),
    fetchUserEmail(),
  ])

  return (
    <main>
      <PlaylistBoard requests={requests} userEmail={userEmail ?? undefined} />
    </main>
  )
}
