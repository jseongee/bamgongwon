import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { cache } from "react"

/**
 * 서버 환경용 Supabase 클라이언트를 생성한다.
 *
 * Next.js `cookies()`를 통해 요청/응답 쿠키를 읽고 쓰므로,
 * Server Component, Server Action, Route Handler에서만 사용해야 한다.
 *
 * @returns 쿠키 기반 세션이 연결된 Supabase 서버 클라이언트
 */
export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          ),
      },
    },
  )
}

/**
 * 현재 로그인한 사용자를 반환한다.
 *
 * `react.cache`로 감싸져 있어 동일 요청 내에서 중복 호출 시 캐싱된 결과를 반환한다.
 * 미인증 상태이면 `null`을 반환한다.
 *
 * @returns 인증된 사용자 객체, 또는 미인증 시 `null`
 */
export const getUser = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})
