"use client"

import { RotateCcw } from "lucide-react"

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html lang="ko">
      <body>
        <main
          style={{
            textAlign: "center",
            padding: "8rem 1rem",
            fontFamily: "sans-serif",
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "rgba(100,100,100,0.3)",
              marginBottom: "1rem",
            }}
          >
            500
          </p>
          <h2
            style={{
              fontSize: "1.125rem",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            오류가 발생했습니다.
          </h2>
          <p
            style={{
              fontSize: "0.875rem",
              color: "rgba(100,100,100,0.7)",
              marginBottom: "2rem",
            }}
          >
            일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
          <button
            onClick={unstable_retry}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.375rem 0.875rem",
              border: "1px solid rgba(100,100,100,0.3)",
              borderRadius: "0.375rem",
              background: "transparent",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            <RotateCcw size={16} />
            다시 시도
          </button>
        </main>
      </body>
    </html>
  )
}
