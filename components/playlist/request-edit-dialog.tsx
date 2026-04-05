"use client"

import { useActionState, useState } from "react"
import { Dialog } from "radix-ui"
import { Pencil, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateRequest } from "@/app/actions/request"

interface RequestEditDialogProps {
  requestId: number
  initialTitle: string
  initialDescription: string
}

export function RequestEditDialog({
  requestId,
  initialTitle,
  initialDescription,
}: RequestEditDialogProps) {
  const [open, setOpen] = useState(false)

  // 서버 액션 래퍼: 성공 시 다이얼로그 닫기
  const action = async (
    prevState: { error: string | null },
    formData: FormData,
  ) => {
    const result = await updateRequest(prevState, formData)
    if (!result.error) {
      setOpen(false)
    }
    return result
  }

  const [state, formAction, isPending] = useActionState(action, { error: null })

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon-xs" aria-label="신청 수정">
          <Pencil />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold">
              신청 수정
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon-xs" aria-label="닫기">
                <X />
              </Button>
            </Dialog.Close>
          </div>
          <form action={formAction} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={requestId} />
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-title"
                className="text-sm font-medium text-foreground"
              >
                제목
              </label>
              <input
                id="edit-title"
                name="title"
                defaultValue={initialTitle}
                required
                autoFocus
                maxLength={100}
                className="rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="edit-description"
                className="text-sm font-medium text-foreground"
              >
                내용
              </label>
              <textarea
                id="edit-description"
                name="description"
                defaultValue={initialDescription}
                required
                maxLength={500}
                rows={4}
                className="resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
              />
            </div>
            {state.error && (
              <p className="text-xs text-destructive">{state.error}</p>
            )}
            <div className="flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button type="button" variant="outline" size="sm">
                  취소
                </Button>
              </Dialog.Close>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? "저장 중..." : "저장"}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
