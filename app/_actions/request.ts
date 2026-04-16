"use server"

import type { SupabaseClient } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

/**
 * 새 플레이리스트 신청을 생성한다.
 *
 * @param _prevState - 이전 상태 (useActionState용)
 * @param formData - `title`, `description` 필드를 포함한 폼 데이터
 * @returns 성공 시 `{ error: null }`, 실패 시 `{ error: 오류 메시지 }`
 */
export async function createRequest(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const auth = await getAuthenticatedClient()
  if (!auth) {
    return { error: "로그인이 필요합니다." }
  }

  const fields = parseRequestFields(formData)
  if (fields.error) {
    return { error: fields.error }
  }

  const { error } = await auth.supabase.from("playlist_requests").insert({
    requester: auth.email,
    title: fields.title,
    description: fields.description,
  })

  if (error) {
    return { error: "신청 중 오류가 발생했습니다. 다시 시도해주세요." }
  }

  revalidateRequestPaths()
  return { error: null }
}

/**
 * 기존 플레이리스트 신청을 수정한다.
 * 본인이 작성한 신청만 수정할 수 있다.
 *
 * @param _prevState - 이전 상태 (useActionState용)
 * @param formData - `id`, `title`, `description` 필드를 포함한 폼 데이터
 * @returns 성공 시 `{ error: null }`, 실패 시 `{ error: 오류 메시지 }`
 */
export async function updateRequest(
  _prevState: { error: string | null },
  formData: FormData,
): Promise<{ error: string | null }> {
  const auth = await getAuthenticatedClient()
  if (!auth) {
    return { error: "로그인이 필요합니다." }
  }

  const id = Number(formData.get("id"))
  if (!id) {
    return { error: "잘못된 요청입니다." }
  }

  const fields = parseRequestFields(formData)
  if (fields.error) {
    return { error: fields.error }
  }

  const { data, error } = await auth.supabase
    .from("playlist_requests")
    .update({
      title: fields.title,
      description: fields.description,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("requester", auth.email)
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

/**
 * 플레이리스트 신청의 좋아요를 토글한다.
 * 이미 좋아요한 경우 취소하고, 그렇지 않으면 추가한다.
 *
 * @param requestId - 좋아요를 토글할 신청의 ID
 * @returns 성공 시 `{ error: null }`, 실패 시 `{ error: 오류 메시지 }`
 */
export async function toggleLike(
  requestId: number,
): Promise<{ error: string | null }> {
  const auth = await getAuthenticatedClient()
  if (!auth) {
    return { error: "로그인이 필요합니다." }
  }

  const { data: existing } = await auth.supabase
    .from("playlist_likes")
    .select("id")
    .eq("request_id", requestId)
    .eq("user_email", auth.email)
    .single()

  if (existing) {
    await auth.supabase.from("playlist_likes").delete().eq("id", existing.id)
  } else {
    await auth.supabase
      .from("playlist_likes")
      .insert({ request_id: requestId, user_email: auth.email })
  }

  revalidateRequestPaths()
  return { error: null }
}

/**
 * 플레이리스트 신청을 삭제한다.
 * 본인이 작성한 신청만 삭제할 수 있으며, 삭제 성공 시 `/requests`로 리다이렉트한다.
 *
 * @param id - 삭제할 신청의 ID
 * @returns 실패 시 `{ error: 오류 메시지 }` (성공 시 리다이렉트로 반환값 없음)
 */
export async function deleteRequest(
  id: number,
): Promise<{ error: string | null }> {
  const auth = await getAuthenticatedClient()
  if (!auth) {
    return { error: "로그인이 필요합니다." }
  }

  const { data, error } = await auth.supabase
    .from("playlist_requests")
    .delete()
    .eq("id", id)
    .eq("requester", auth.email)
    .select()

  if (error) {
    return { error: "삭제 중 오류가 발생했습니다. 다시 시도해주세요." }
  }
  if (!data || data.length === 0) {
    return { error: "삭제 권한이 없거나 존재하지 않는 신청입니다." }
  }

  redirect("/requests")
}

/**
 * 인증된 Supabase 클라이언트와 사용자 이메일을 함께 반환한다.
 *
 * @returns 인증된 경우 `{ supabase, email }`, 미인증 상태라면 `null`
 */
async function getAuthenticatedClient(): Promise<{
  supabase: SupabaseClient
  email: string
} | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return null
  }

  return { supabase, email: user.email }
}

/**
 * FormData에서 `title`과 `description`을 추출하고 유효성을 검사한다.
 *
 * @param formData - `title`, `description` 필드를 포함한 폼 데이터
 * @returns 유효한 경우 `{ title, description }`, 유효하지 않은 경우 `{ error: 오류 메시지 }`
 */
function parseRequestFields(
  formData: FormData,
):
  | { error: string; title?: never; description?: never }
  | { error?: never; title: string; description: string } {
  const title = formData.get("title")?.toString().trim()
  const description = formData.get("description")?.toString().trim()

  if (!title) {
    return { error: "제목을 입력해주세요." }
  }
  if (!description) {
    return { error: "내용을 입력해주세요." }
  }

  return { title, description }
}

/**
 * 신청 관련 경로의 캐시를 무효화한다.
 *
 * @param id - 상세 페이지 캐시도 함께 무효화할 신청 ID (선택)
 */
function revalidateRequestPaths(id?: number) {
  revalidatePath("/requests")
  revalidatePath("/")
  if (id !== undefined) {
    revalidatePath(`/requests/${id}`)
  }
}
