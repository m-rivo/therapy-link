'use client'

import { User } from 'lucide-react'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { LogoutButton } from '@/app/(frontend)/(private)/components/LogoutButton'
import Link from 'next/link'
import FullScreenLoader from './FullScreenLoader'
import { useState } from 'react'

export default function UserDropdownMenuContent() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <FullScreenLoader show={isLoading} />
      <DropdownMenuContent sideOffset={10}>
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="size-[1.2rem] mr-2" /> <Link href="/user-profile">Mi Perfil</Link>
        </DropdownMenuItem>
        <LogoutButton isLoading={isLoading} setIsLoading={setIsLoading} />
      </DropdownMenuContent>
    </>
  )
}
