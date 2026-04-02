import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PlaylistBoard } from "@/components/playlist-board"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <PlaylistBoard />
      </main>
      <Footer />
    </div>
  )
}
