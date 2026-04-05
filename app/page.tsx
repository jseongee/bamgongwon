import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const requests = await fetchPlaylistRequests(PREVIEW_LIMIT)

  return (
    <main>
      <HeroSection />
      <PlaylistPreview requests={requests} />
    </main>
  )
}
