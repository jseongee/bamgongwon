import { Button } from "@/components/ui/button"
import { SquarePlay } from "lucide-react"
import { RequestButton } from "./request-button"
import { YOUTUBE_URL } from "@/constants/site-config"

export function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 py-20 sm:py-28">
      {/* 배경 글로우 오브 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 메인 퍼플 오브 */}
        <div className="absolute left-1/2 top-1/2 size-160 rounded-full bg-primary/15 blur-[130px] animate-orb" />
        {/* 보조 핑크-마젠타 오브 */}
        <div className="absolute left-[38%] top-[45%] size-100 rounded-full bg-accent/18 blur-[100px] animate-orb-alt" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        {/* 뱃지 */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
          플레이리스트 신청
        </div>

        {/* 제목 */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          여러분이 듣고 싶은
          <br />
          <span className="text-muted-foreground">
            플레이리스트를 신청하세요!
          </span>
        </h1>

        {/* 설명 */}
        <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
          원하는 분위기의 플레이리스트 제작을 신청할 수 있습니다.
        </p>
        <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
          신청된 목록은 실시간으로 확인 가능합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <RequestButton isLoggedIn={isLoggedIn} />
            <Button asChild size="lg" variant="outline" className="gap-2 px-6">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SquarePlay className="size-4" />
                채널 바로가기
              </a>
            </Button>
          </div>
          {!isLoggedIn && (
            <p className="text-xs text-muted-foreground">
              * 구글 로그인 후 신청 가능합니다.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
