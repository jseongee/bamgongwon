import { createClient } from "@/lib/supabase/server"
import type { PlaylistRequest } from "@/types/playlist"

export async function fetchPlaylistRequests(
  limit?: number,
): Promise<PlaylistRequest[]> {
  const supabase = await createClient()
  let query = supabase
    .from("playlist_requests")
    .select("*")
    .order("requested_at", { ascending: false })

  if (limit !== undefined) {
    query = query.limit(limit)
  }

  const { data } = await query
  return data ?? []
}

export async function fetchCurrentUserEmail(): Promise<string | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user?.email ?? null
}
