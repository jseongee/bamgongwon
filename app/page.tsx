import { Suspense } from "react"
import { getUser } from "@/lib/supabase/server"
import { HeroSection } from "./_components/hero-section"
import { PlaylistSkeleton } from "@/components/requests/playlist-skeleton"
import { PlaylistPreviewSection } from "./_components/playlist-preview-section"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const user = await getUser()

  return (
    <main>
      <HeroSection isLoggedIn={!!user} />
      <Suspense fallback={<PlaylistSkeleton count={PREVIEW_LIMIT} />}>
        <PlaylistPreviewSection limit={PREVIEW_LIMIT} userEmail={user?.email} />
      </Suspense>
    </main>
  )
}
