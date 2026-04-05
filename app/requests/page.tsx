import {
  fetchPlaylistRequests,
  fetchCurrentUserEmail,
} from "@/lib/supabase/queries"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

export default async function Page() {
  const [requests, currentUserEmail] = await Promise.all([
    fetchPlaylistRequests(),
    fetchCurrentUserEmail(),
  ])

  return (
    <main>
      <PlaylistBoard
        requests={requests}
        currentUserEmail={currentUserEmail ?? undefined}
      />
    </main>
  )
}
