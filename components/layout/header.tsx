import Link from "next/link"
import { AuthButton } from "@/components/auth/auth-button"
import { Button } from "@/components/ui/button"
import { Music, SquarePlay } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-border">
            <Music className="size-4 text-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight">밤공원</span>
        </Link>

        {/* 우측 버튼 그룹 */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="YouTube 채널 바로가기"
          >
            <a
              href="http://youtube.com/@밤공원?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SquarePlay className="size-4" />
            </a>
          </Button>
          <AuthButton />
        </div>
      </div>
    </header>
  )
}
