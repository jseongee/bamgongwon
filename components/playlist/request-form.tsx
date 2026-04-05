"use client"

import { useActionState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { submitRequest } from "@/app/actions/request"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const initialState = { error: null }

export function RequestForm({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [state, action, isPending] = useActionState(submitRequest, initialState)
  const hasSubmitted = useRef(false)

  useEffect(() => {
    if (hasSubmitted.current && !isPending && state.error === null) {
      router.push("/requests")
    }
  }, [state, isPending, router])

  function wrappedAction(formData: FormData) {
    hasSubmitted.current = true
    action(formData)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          플레이리스트 신청
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {userEmail} 계정으로 신청합니다.
        </p>
      </div>

      {/* 폼 */}
      <form action={wrappedAction} className="flex flex-col gap-5">
        {/* 제목 */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium">
            제목
            <span className="ml-1 text-red-400">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={100}
            autoFocus
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            내용
            <span className="ml-1 text-red-400">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            maxLength={500}
            rows={4}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* 에러 메시지 */}
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}

        {/* 버튼 */}
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isPending} className="gap-2">
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "처리 중..." : "신청하기"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={isPending}
          >
            취소
          </Button>
        </div>
      </form>
    </div>
  )
}
