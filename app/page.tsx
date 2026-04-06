import { fetchPlaylistRequests, fetchUserEmail } from "@/lib/supabase/queries"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const [requests, userEmail] = await Promise.all([
    fetchPlaylistRequests(PREVIEW_LIMIT),
    fetchUserEmail(),
  ])

  return (
    <main>
      <HeroSection />
      <PlaylistPreview requests={requests} userEmail={userEmail ?? undefined} />
    </main>
  )
}
