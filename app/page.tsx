import { Suspense } from "react"
import { getUser } from "@/lib/supabase/server"
import { HeroSection } from "./_components/hero-section"
import { RequestCardSkeleton } from "@/components/requests/request-card-skeleton"
import { RequestPreview } from "./_components/request-preview"

const PREVIEW_LIMIT = 3

export default async function Page() {
  const user = await getUser()

  return (
    <main>
      <HeroSection isLoggedIn={!!user} />
      <Suspense fallback={<RequestCardSkeleton count={PREVIEW_LIMIT} />}>
        <RequestPreview limit={PREVIEW_LIMIT} userEmail={user?.email} />
      </Suspense>
    </main>
  )
}
