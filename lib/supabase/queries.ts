import { createClient, getUser } from "@/lib/supabase/server"
import type { PlaylistRequest } from "@/types/request"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function fetchPlaylistRequests(
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

export async function fetchPlaylistRequestById(
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

export async function fetchUserPlaylistRequests(
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
