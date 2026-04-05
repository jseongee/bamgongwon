import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { PlaylistBoard } from "@/components/playlist/playlist-board"

export default async function Page() {
  const requests = await fetchPlaylistRequests()

  return (
    <main>
      <PlaylistBoard requests={requests} />
    </main>
  )
}
