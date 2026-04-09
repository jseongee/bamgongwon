export type Status = "pending" | "completed" | "in_progress" | "adopted"

export interface PlaylistRequest {
  id: number
  requester: string
  title: string
  description: string
  requested_at: string
  status: Status
  likes_count: number
  is_liked: boolean
  youtube_url?: string | null
  updated_at?: string | null
}
