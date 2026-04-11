"use client"

import { useState } from "react"
import { AlertDialog } from "radix-ui"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteRequest } from "@/app/_actions/request"

interface RequestDeleteDialogProps {
  requestId: number
}

export function RequestDeleteDialog({ requestId }: RequestDeleteDialogProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDelete = async () => {
    const result = await deleteRequest(requestId)
    if (result.error) {
      setError(result.error)
    } else {
      setOpen(false)
    }
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <Button variant="ghost" size="icon-xs" aria-label="신청 삭제">
          <Trash2 />
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <AlertDialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <AlertDialog.Title className="mb-2 text-base font-semibold">
            신청을 삭제할까요?
          </AlertDialog.Title>
          <AlertDialog.Description className="mb-4 text-sm text-muted-foreground">
            삭제된 신청은 복구할 수 없습니다.
          </AlertDialog.Description>
          {error && <p className="mb-3 text-xs text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="outline" size="sm">
                취소
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                삭제
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
