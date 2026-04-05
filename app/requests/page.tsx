import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { PlaylistBoard } from "@/components/playlist/playlist-board"
import { Footer } from "@/components/layout/footer"

export default async function Page() {
  const supabase = await createClient()
  const { data: requests } = await supabase
    .from("playlist_requests")
    .select("*")
    .order("requested_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PlaylistBoard requests={requests ?? []} />
      </main>
      <Footer />
    </div>
  )
}
