import { User } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ModeToggle } from './ModeToggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { LogoutButton } from '@/app/(frontend)/(private)/components/LogoutButton'
import Link from 'next/link'
import { getUser } from '@/app/(frontend)/(private)/actions/getUser'
import { Media } from '@/payload-types'

export default async function Navbar() {
  const user = await getUser()

  return (
    <nav className="p-4 flex items-center justify-between">
      {/* LEFT */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {(user?.profileImage as Media)?.url && (
                <AvatarImage src={(user?.profileImage as Media)?.url || undefined} alt="logo" />
              )}
              <AvatarFallback>
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="size-[1.2rem] mr-2" /> <Link href="/user-profile">Mi Perfil</Link>
            </DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
