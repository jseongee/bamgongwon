"use client"

import Link from "next/link"
import { signInWithGoogle } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { ListMusic } from "lucide-react"

interface RequestButtonProps {
  isLoggedIn: boolean
}

export function RequestButton({ isLoggedIn }: RequestButtonProps) {
  if (isLoggedIn) {
    return (
      <Button asChild size="lg" className="gap-2 px-6">
        <Link href="/requests/new">
          <ListMusic className="size-4" />
          플레이리스트 신청하기
        </Link>
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="gap-2 px-6"
      onClick={() => signInWithGoogle("/requests/new")}
    >
      <ListMusic className="size-4" />
      플레이리스트 신청하기
    </Button>
  )
}
