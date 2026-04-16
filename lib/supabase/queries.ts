import { createClient, getUser } from "@/lib/supabase/server"
import type { PlaylistRequest } from "@/types/request"
import type { SupabaseClient } from "@supabase/supabase-js"

/**
 * 플레이리스트 신청 목록을 최신순으로 조회한다.
 * 로그인된 사용자가 있으면 각 항목의 좋아요 여부(`is_liked`)를 함께 반환한다.
 *
 * @param limit - 조회할 최대 건수. 생략하면 전체 조회.
 * @returns 신청 목록 배열. 오류 또는 데이터 없으면 빈 배열.
 */
export async function fetchRequests(
  limit?: number,
): Promise<PlaylistRequest[]> {
  const supabase = await createClient()

  // 현재 사용자 조회 (좋아요 여부 판단용)
  const user = await getUser()
  const userEmail = user?.email

  let query = supabase
    .from("playlist_requests")
    .select("*")
    .order("requested_at", { ascending: false })

  if (limit !== undefined) {
    query = query.limit(limit)
  }

  const { data } = await query
  if (!data) return []

  // 유저가 좋아요한 request_id Set 조회
  const likedSet = userEmail
    ? await getUserLikedSet(supabase, userEmail)
    : new Set<number>()

  return (data ?? []).map((row) => ({
    ...row,
    is_liked: likedSet.has(row.id),
  })) as PlaylistRequest[]
}

/**
 * ID로 플레이리스트 신청 단건을 조회한다.
 * 로그인된 사용자가 있으면 좋아요 여부(`is_liked`)를 함께 반환한다.
 *
 * @param id - 조회할 신청 건의 ID.
 * @returns 신청 데이터. 존재하지 않으면 `null`.
 */
export async function fetchRequestById(
  id: number,
): Promise<PlaylistRequest | null> {
  const supabase = await createClient()

  const user = await getUser()
  const userEmail = user?.email

  const { data, error } = await supabase
    .from("playlist_requests")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !data) return null

  let isLiked = false
  if (userEmail) {
    const likedSet = await getUserLikedSet(supabase, userEmail)
    isLiked = likedSet.has(id)
  }

  return { ...data, is_liked: isLiked } as PlaylistRequest
}

/**
 * 특정 사용자가 작성한 플레이리스트 신청 목록을 최신순으로 조회한다.
 * 해당 사용자의 좋아요 여부(`is_liked`)를 함께 반환한다.
 *
 * @param userEmail - 신청 작성자 이메일.
 * @returns 신청 목록 배열. 데이터 없으면 빈 배열.
 */
export async function fetchUserRequests(
  userEmail: string,
): Promise<PlaylistRequest[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from("playlist_requests")
    .select("*")
    .eq("requester", userEmail)
    .order("requested_at", { ascending: false })

  if (!data) return []

  const likedSet = await getUserLikedSet(supabase, userEmail)

  return data.map((row) => ({
    ...row,
    is_liked: likedSet.has(row.id),
  })) as PlaylistRequest[]
}

/**
 * 특정 사용자가 좋아요한 플레이리스트 신청 목록을 최신순으로 조회한다.
 * 반환되는 모든 항목의 `is_liked`는 `true`다.
 *
 * @param userEmail - 좋아요를 누른 사용자 이메일.
 * @returns 좋아요한 신청 목록 배열. 없으면 빈 배열.
 */
export async function fetchUserLikedRequests(
  userEmail: string,
): Promise<PlaylistRequest[]> {
  const supabase = await createClient()

  // 좋아요한 request_id 목록 조회
  const { data: likes } = await supabase
    .from("playlist_likes")
    .select("request_id")
    .eq("user_email", userEmail)

  if (!likes || likes.length === 0) return []

  const requestIds = likes.map((l: { request_id: number }) => l.request_id)

  const { data } = await supabase
    .from("playlist_requests")
    .select("*")
    .in("id", requestIds)
    .order("requested_at", { ascending: false })

  if (!data) return []

  return data.map((row) => ({
    ...row,
    is_liked: true,
  })) as PlaylistRequest[]
}

/**
 * 특정 사용자가 좋아요한 request_id의 집합을 반환한다.
 *
 * @param supabase - 서버 Supabase 클라이언트.
 * @param userEmail - 조회할 사용자 이메일.
 * @returns 좋아요한 request_id로 구성된 `Set<number>`.
 */
async function getUserLikedSet(
  supabase: SupabaseClient,
  userEmail: string,
): Promise<Set<number>> {
  const { data } = await supabase
    .from("playlist_likes")
    .select("request_id")
    .eq("user_email", userEmail)
  return new Set((data ?? []).map((l: { request_id: number }) => l.request_id))
}
