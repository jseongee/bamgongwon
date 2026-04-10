import { ImageResponse } from "next/og"

export const alt = "플레이리스트 신청 목록 — 밤공원"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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

export default async function Image() {
  const fontData = await loadFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            top: "-100px",
            right: "-60px",
            width: "460px",
            height: "460px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "160px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)",
          }}
        />

        {/* 컨텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
          }}
        >
          {/* 페이지 구분 레이블 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                fontWeight: 400,
                color: "#a78bfa",
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "8px",
                padding: "6px 16px",
              }}
            >
              신청 목록
            </div>
          </div>

          {/* 사이트명 */}
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.1,
              letterSpacing: "-2px",
            }}
          >
            밤공원
          </div>

          {/* 설명 */}
          <div
            style={{
              fontSize: "34px",
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            채택된 신청과 제작 현황을 한눈에 확인하세요.
          </div>
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            right: "80px",
            fontSize: "22px",
            color: "#6d28d9",
            fontWeight: 400,
          }}
        >
          bamgongwon.com
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
