import { Button } from "@/components/ui/button";
import { ListMusic } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 py-20 sm:py-28">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="size-150 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        {/* 뱃지 */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          구독자 전용 플레이리스트 신청
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
          채널 구독자라면 누구나 원하는 분위기의 플레이리스트 제작을 신청할 수
          있습니다. 신청된 목록은 실시간으로 확인 가능합니다.
        </p>

        {/* CTA 버튼 */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <Button size="lg" className="gap-2 px-6">
            <ListMusic className="size-4" />
            플레이리스트 신청하기
          </Button>
          <p className="text-xs text-muted-foreground">
            * 구글 로그인 및 채널 구독 확인 후 신청 가능합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
