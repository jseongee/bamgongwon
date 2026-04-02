import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/layout/hero-section"
import { PlaylistPreview } from "@/components/playlist/playlist-preview"
import { Footer } from "@/components/layout/footer"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <PlaylistPreview />
      </main>
      <Footer />
    </div>
  )
}
