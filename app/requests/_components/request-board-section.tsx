import { fetchRequests } from "@/lib/supabase/queries"
import { getUser } from "@/lib/supabase/server"
import { RequestBoard } from "./request-board"

export async function RequestBoardSection() {
  const [requests, user] = await Promise.all([fetchRequests(), getUser()])
  return <RequestBoard requests={requests} userEmail={user?.email} />
}
