import { Header } from "@/components/layout/header"
import { PlaylistBoard } from "@/components/playlist/playlist-board"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <PlaylistBoard />
      </main>
      <Footer />
    </div>
  )
}
