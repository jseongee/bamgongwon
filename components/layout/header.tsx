import Link from "next/link"
import { AuthButton } from "@/components/auth/auth-button"
import { Music } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-border transition-all hover:shadow-glow-sm hover:bg-primary/15">
            <Music className="size-4 text-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight">밤공원</span>
        </Link>

        {/* 로그인 버튼 */}
        <AuthButton />
      </div>
    </header>
  )
}
