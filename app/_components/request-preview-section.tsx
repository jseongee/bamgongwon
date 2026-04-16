import { fetchRequests } from "@/lib/supabase/queries"
import { RequestPreview } from "./request-preview"

export async function RequestPreviewSection({
  limit,
  userEmail,
}: {
  limit: number
  userEmail?: string
}) {
  const requests = await fetchRequests(limit)
  return <RequestPreview requests={requests} userEmail={userEmail} />
}
