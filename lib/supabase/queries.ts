import { createClient, getUser } from "@/lib/supabase/server"
import type { PlaylistRequest } from "@/types/playlist"

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
  let likedSet = new Set<number>()
  if (userEmail) {
    const { data: userLikes } = await supabase
      .from("playlist_likes")
      .select("request_id")
      .eq("user_email", userEmail)
    likedSet = new Set(
      (userLikes ?? []).map((l: { request_id: number }) => l.request_id),
    )
  }

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
    const { data: like } = await supabase
      .from("playlist_likes")
      .select("id")
      .eq("request_id", id)
      .eq("user_email", userEmail)
      .single()
    isLiked = !!like
  }

  return { ...data, is_liked: isLiked } as PlaylistRequest
}
