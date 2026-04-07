"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function revalidateRequestPaths(id?: number) {
  revalidatePath("/requests")
  revalidatePath("/")
  if (id !== undefined) revalidatePath(`/requests/${id}`)
}

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

  revalidateRequestPaths()

  return { error: null }
}

export async function updateRequest(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: "로그인이 필요합니다." }
  }

  const id = Number(formData.get("id"))
  const title = formData.get("title")?.toString().trim()
  const description = formData.get("description")?.toString().trim()

  if (!id) {
    return { error: "잘못된 요청입니다." }
  }
  if (!title || title.length === 0) {
    return { error: "제목을 입력해주세요." }
  }
  if (!description || description.length === 0) {
    return { error: "내용을 입력해주세요." }
  }

  const { data, error } = await supabase
    .from("playlist_requests")
    .update({ title, description })
    .eq("id", id)
    .eq("requester", user.email)
    .select()

  if (error) {
    return { error: "수정 중 오류가 발생했습니다. 다시 시도해주세요." }
  }
  if (!data || data.length === 0) {
    return { error: "수정 권한이 없거나 존재하지 않는 신청입니다." }
  }

  revalidateRequestPaths(id)

  return { error: null }
}

export async function toggleLike(
  requestId: number,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: "로그인이 필요합니다." }
  }

  // 이미 좋아요했는지 확인
  const { data: existing } = await supabase
    .from("playlist_likes")
    .select("id")
    .eq("request_id", requestId)
    .eq("user_email", user.email)
    .single()

  if (existing) {
    await supabase.from("playlist_likes").delete().eq("id", existing.id)
  } else {
    await supabase
      .from("playlist_likes")
      .insert({ request_id: requestId, user_email: user.email })
  }

  revalidateRequestPaths()

  return { error: null }
}

export async function deleteRequest(
  id: number,
): Promise<{ error: string | null }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { error: "로그인이 필요합니다." }
  }

  const { data, error } = await supabase
    .from("playlist_requests")
    .delete()
    .eq("id", id)
    .eq("requester", user.email)
    .select()

  if (error) {
    return { error: "삭제 중 오류가 발생했습니다. 다시 시도해주세요." }
  }
  if (!data || data.length === 0) {
    return { error: "삭제 권한이 없거나 존재하지 않는 신청입니다." }
  }

  redirect("/requests")
}
