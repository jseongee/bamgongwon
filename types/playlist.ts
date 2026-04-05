export type Status = "completed" | "in_progress" | "adopted"

export interface PlaylistRequest {
  id: number
  requester: string
  title: string
  description: string
  requested_at: string
  status: Status
}
