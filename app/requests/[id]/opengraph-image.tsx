import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"
import type { Status } from "@/types/request"

export const alt = "플레이리스트 신청 상세 — 밤공원"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// 상태별 표시 설정
const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; border: string }> = {
  pending: {
    label: "대기 중",
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.25)",
  },
  adopted: {
    label: "채택됨",
    color: "#e879f9",
    bg: "rgba(217,70,239,0.1)",
    border: "rgba(217,70,239,0.25)",
  },
  in_progress: {
    label: "제작 중",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.1)",
    border: "rgba(34,211,238,0.25)",
  },
  completed: {
    label: "제작 완료",
    color: "#34d399",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.25)",
  },
}

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 5.1; rv:30.0) Gecko/20100101 Firefox/30.0",
        },
      },
    ).then((r) => r.text())

    const fontUrl = css.match(/url\(([^)]+)\)/)?.[1]
    if (!fontUrl) return null

    return fetch(fontUrl).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const numericId = Number(id)

  // 신청 데이터 및 폰트 병렬 로드
  const [request, fontData] = await Promise.all([
    (async () => {
      if (isNaN(numericId)) return null
      const supabase = await createClient()
      const { data } = await supabase
        .from("playlist_requests")
        .select("id, title, status, likes_count")
        .eq("id", numericId)
        .single()
      return data as {
        id: number
        title: string
        status: Status
        likes_count: number
      } | null
    })(),
    loadFont(),
  ])

  const statusConfig = request ? STATUS_CONFIG[request.status] : null

  // 긴 제목 말줄임 처리 (두 줄 이상 방지)
  const title = request
    ? request.title.length > 40
      ? request.title.slice(0, 38) + "…"
      : request.title
    : "신청을 찾을 수 없습니다."

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0c0a16 0%, #18102c 100%)",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "100px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 70%)",
          }}
        />

        {/* 상단: 상태 뱃지 + 좋아요 수 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            position: "relative",
          }}
        >
          {statusConfig && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "22px",
                fontWeight: 400,
                color: statusConfig.color,
                background: statusConfig.bg,
                border: `1px solid ${statusConfig.border}`,
                borderRadius: "8px",
                padding: "6px 16px",
              }}
            >
              {statusConfig.label}
            </div>
          )}
          {request && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "22px",
                color: "#64748b",
              }}
            >
              <span>♥</span>
              <span>{request.likes_count}</span>
            </div>
          )}
        </div>

        {/* 제목 */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.25,
            letterSpacing: "-1px",
            maxWidth: "900px",
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          {title}
        </div>

        {/* 하단: 사이트명 */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#a78bfa",
            }}
          >
            밤공원
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Noto Sans KR",
                data: fontData,
                weight: 400,
                style: "normal",
              },
              {
                name: "Noto Sans KR",
                data: fontData,
                weight: 700,
                style: "normal",
              },
            ],
          }
        : {}),
    },
  )
}
