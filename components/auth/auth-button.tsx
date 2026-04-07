import { getUser } from "@/lib/supabase/server"
import { SignInButton } from "@/components/auth/sign-in-button"
import { SignOutButton } from "@/components/auth/sign-out-button"

export async function AuthButton() {
  const user = await getUser()

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{user.email}</span>
        <SignOutButton />
      </div>
    )
  }

  return <SignInButton />
}
