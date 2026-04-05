"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitRequest(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  // 서버 액션 내에서 인증 재검증 (보안 필수)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: "로그인이 필요합니다." }
  }

  const title = formData.get("title")?.toString().trim()
  const description = formData.get("description")?.toString().trim()

  if (!title || title.length === 0) {
    return { error: "제목을 입력해주세요." }
  }
  if (!description || description.length === 0) {
    return { error: "내용을 입력해주세요." }
  }

  const { error } = await supabase.from("playlist_requests").insert({
    requester: user.email,
    title,
    description,
  })

  if (error) {
    return { error: "신청 중 오류가 발생했습니다. 다시 시도해주세요." }
  }

  revalidatePath("/requests")
  revalidatePath("/")

  return { error: null }
}
