import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Music, LogIn } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* 로고 */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 border border-border">
            <Music className="size-4 text-primary" />
          </div>
          <span className="text-base font-semibold tracking-tight">밤공원</span>
        </div>

        {/* 우측 버튼 그룹 */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="gap-2">
            <LogIn className="size-3.5" />
            Google로 로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
