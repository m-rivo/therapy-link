import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ModeToggle } from './ModeToggle'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { getUser } from '@/app/(frontend)/(private)/actions/getUser'
import { Media } from '@/payload-types'

import UserDropdownMenuContent from './UserDropdownMenuContent'

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
          <UserDropdownMenuContent />
        </DropdownMenu>
      </div>
    </nav>
  )
}
