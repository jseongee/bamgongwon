import {
  fetchPlaylistRequests,
  fetchCurrentUserEmail,
} from "@/lib/supabase/queries"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const [requests, currentUserEmail] = await Promise.all([
    fetchPlaylistRequests(PREVIEW_LIMIT),
    fetchCurrentUserEmail(),
  ])

  return (
    <main>
      <HeroSection />
      <PlaylistPreview
        requests={requests}
        currentUserEmail={currentUserEmail ?? undefined}
      />
    </main>
  )
}
