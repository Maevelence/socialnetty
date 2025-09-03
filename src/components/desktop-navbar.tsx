import { currentUser } from "@clerk/nextjs/server"
import Link from "next/link"
import { ModeToggle } from "./mode-switch"
import { Button } from "./ui/button"
import { BellIcon, HomeIcon, UserIcon } from "lucide-react"
import { SignInButton, UserButton } from "@clerk/nextjs"

export default async function DesktopNavbar() {
  const user = await currentUser()
    return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Домой</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Уведомления</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Профиль</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">Войти</Button>
        </SignInButton>
      )}
    </div>
  )
}
