"use client"

import { ThemeToggle } from "@/components/theme/theme-toggle"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 밤공원. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground">
              플레이리스트 신청은 채널 구독자만 가능합니다.
            </p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
