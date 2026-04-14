"use client"

import { useEffect } from "react"
import { signInWithGoogle } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function SignInButton() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        router.refresh()
      }
    }
    window.addEventListener("pageshow", handlePageShow)
    return () => window.removeEventListener("pageshow", handlePageShow)
  }, [router])

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={() => signInWithGoogle(pathname)}
    >
      <LogIn className="size-3.5" />
      Google로 로그인
    </Button>
  )
}
