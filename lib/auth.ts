import { createClient } from "@/lib/supabase/client"

export async function signInWithGoogle(next?: string): Promise<void> {
  const supabase = createClient()
  const redirectTo = next
    ? `${window.location.origin}/auth/callback?next=${next}`
    : `${window.location.origin}/auth/callback`

  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  })
}
