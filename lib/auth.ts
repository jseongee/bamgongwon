import { createClient } from "@/lib/supabase/client"

/**
 * Google OAuth 로그인을 시작한다.
 *
 * 인증 완료 후 `/auth/callback`으로 리다이렉트되며,
 * `next`가 주어지면 콜백 이후 해당 경로로 이동한다.
 *
 * @param next - 로그인 완료 후 이동할 경로 (예: `/requests`). 생략 시 origin으로 이동
 */
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
