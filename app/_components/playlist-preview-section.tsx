import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { PlaylistPreview } from "./playlist-preview"

export async function PlaylistPreviewSection({
  limit,
  userEmail,
}: {
  limit: number
  userEmail?: string
}) {
  const requests = await fetchPlaylistRequests(limit)
  return <PlaylistPreview requests={requests} userEmail={userEmail} />
}
