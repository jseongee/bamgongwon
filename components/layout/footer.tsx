"use client"

import { Mail, SquarePlay } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/theme-toggle"
import { YOUTUBE_URL, CONTACT_EMAIL } from "@/constants/site-config"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} 밤공원. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="icon" className="rounded-full" aria-label="이메일 문의">
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline" size="icon" className="rounded-full" aria-label="YouTube 채널">
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
                <SquarePlay className="size-4" />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
