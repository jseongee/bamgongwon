import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"
import { Footer } from "@/components/layout/footer"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const supabase = await createClient()
  const { data: requests } = await supabase
    .from("playlist_requests")
    .select("*")
    .order("requested_at", { ascending: false })
    .limit(PREVIEW_LIMIT)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <PlaylistPreview requests={requests ?? []} />
      </main>
      <Footer />
    </div>
  )
}
