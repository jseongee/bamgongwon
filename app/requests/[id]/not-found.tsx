import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
      <p className="mb-4 text-4xl font-bold text-muted-foreground/30">404</p>
      <h2 className="mb-2 text-lg font-semibold">신청글을 찾을 수 없습니다.</h2>
      <p className="mb-8 text-sm text-muted-foreground">
        삭제되었거나 존재하지 않는 글입니다.
      </p>
      <Button asChild variant="outline" size="sm">
        <Link href="/requests">
          <ChevronLeft className="size-4" />
          신청 목록으로
        </Link>
      </Button>
    </main>
  )
}
