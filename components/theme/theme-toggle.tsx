"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="테마 전환"
      className="relative flex h-8 w-16 cursor-pointer items-center rounded-full border border-border bg-muted p-1 transition-colors duration-300"
    >
      {/* 슬라이딩 원형 인디케이터: CSS로 위치 제어 */}
      <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-primary shadow-sm transition-transform duration-300 translate-x-0 dark:translate-x-8">
        <Sun className="size-3.5 text-primary-foreground dark:hidden" />
        <Moon className="size-3.5 text-primary-foreground hidden dark:block" />
      </span>

      {/* 비활성 아이콘 */}
      <span className="absolute left-2 opacity-0 dark:opacity-50">
        <Sun className="size-3.5 text-muted-foreground" />
      </span>
      <span className="absolute right-2 opacity-50 dark:opacity-0">
        <Moon className="size-3.5 text-muted-foreground" />
      </span>
    </button>
  )
}
