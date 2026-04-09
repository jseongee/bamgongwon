import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RequestForm } from "@/components/playlist/request-form"

export const metadata: Metadata = {
  title: "플레이리스트 신청",
  description: "원하는 플레이리스트를 밤공원에 신청해보세요.",
  robots: { index: false, follow: false },
}

export default async function Page() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <RequestForm />
    </main>
  )
}
