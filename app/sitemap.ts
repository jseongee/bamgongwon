import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/requests`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ]

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("playlist_requests")
      .select("id, updated_at, requested_at")
      .order("requested_at", { ascending: false })

    if (data) {
      dynamicRoutes = data.map((row) => ({
        url: `${siteUrl}/requests/${row.id}`,
        lastModified: new Date(row.updated_at ?? row.requested_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    }
  } catch {
    // DB 오류 시 정적 라우트만 반환
  }

  return [...staticRoutes, ...dynamicRoutes]
}
