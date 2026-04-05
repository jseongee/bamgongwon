import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RequestForm } from "@/components/playlist/request-form"

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
