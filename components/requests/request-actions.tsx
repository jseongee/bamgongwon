"use client"

import { RequestEditDialog } from "./request-edit-dialog"
import { RequestDeleteDialog } from "./request-delete-dialog"

interface RequestActionsProps {
  requestId: number
  initialTitle: string
  initialDescription: string
}

export function RequestActions({
  requestId,
  initialTitle,
  initialDescription,
}: RequestActionsProps) {
  return (
    <div className="flex items-center gap-1">
      <RequestEditDialog
        requestId={requestId}
        initialTitle={initialTitle}
        initialDescription={initialDescription}
      />
      <RequestDeleteDialog requestId={requestId} />
    </div>
  )
}
