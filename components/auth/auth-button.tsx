import Link from "next/link"
import { getUser } from "@/lib/supabase/server"
import { SignInButton } from "@/components/auth/sign-in-button"
import { SignOutButton } from "@/components/auth/sign-out-button"

export async function AuthButton() {
  const user = await getUser()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/me"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          내 활동
        </Link>
        <SignOutButton />
      </div>
    )
  }

  return <SignInButton />
}
