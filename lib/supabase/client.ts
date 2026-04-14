import { createBrowserClient } from "@supabase/ssr"

/**
 * 브라우저 환경용 Supabase 클라이언트를 생성한다.
 *
 * 쿠키 기반 세션을 자동으로 처리하며, Client Component에서만 사용해야 한다.
 *
 * @returns Supabase 브라우저 클라이언트
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
