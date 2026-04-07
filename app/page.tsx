import { fetchPlaylistRequests } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const [requests, user] = await Promise.all([
    fetchPlaylistRequests(PREVIEW_LIMIT),
    getUser(),
  ])

  return (
    <main>
      <HeroSection />
      <PlaylistPreview requests={requests} userEmail={user?.email} />
    </main>
  )
}
