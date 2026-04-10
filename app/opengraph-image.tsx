import { ImageResponse } from "next/og"

export const alt = "밤공원 — 플레이리스트 신청 사이트"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// Noto Sans KR (WOFF) 폰트를 Google Fonts에서 가져옴
async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700",
      {
        headers: {
          // Firefox 30 UA → WOFF 형식 반환 (satori 지원)
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
            top: "-120px",
            right: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "200px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,70,239,0.15) 0%, transparent 70%)",
          }}
        />

        {/* 컨텐츠 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
          }}
        >
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
              fontSize: "36px",
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            플레이리스트를 신청하고 제작 현황을 확인하세요.
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
