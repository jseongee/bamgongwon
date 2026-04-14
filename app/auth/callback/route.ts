import { createServerClient } from "@supabase/ssr"
import { NextRequest, NextResponse } from "next/server"

/**
 * Google OAuth 콜백을 처리하고 세션을 교환한다.
 *
 * Supabase Auth가 발급한 `code` 파라미터를 받아 액세스 토큰과 교환하고,
 * 응답 쿠키에 세션을 저장한다.
 * `next` 파라미터가 `/`로 시작하는 경로이면 로그인 후 해당 경로로 이동하고,
 * 없으면 origin으로 리다이렉트한다.
 *
 * @param request - 수신된 HTTP GET 요청 (`code`, `next` 쿼리 파라미터 포함)
 * @returns 지정된 경로 또는 origin으로의 리다이렉트 응답
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next")
  const redirectUrl = next?.startsWith("/") ? `${origin}${next}` : origin
  const response = NextResponse.redirect(redirectUrl)

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            )
          },
        },
      },
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  return response
}
