'use client'

import { LogOut } from 'lucide-react'
import { logout } from '../actions/logout'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import FullScreenLoader from '@/components/FullScreenLoader'
import type { Dispatch, SetStateAction } from 'react'

export const LogoutButton = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}) => {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsLoading(true)
    setError(null)

    const result = await logout()

    setIsLoading(false)

    if (result.success) {
      router.push('/login')
    } else {
      setError(result.error || 'Error al cerrar sesión.')
    }
  }

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <>
      <FullScreenLoader show={isLoading} />
      <DropdownMenuItem variant="destructive" onClick={handleLogout} disabled={isLoading}>
        <LogOut className="size-[1.2rem] mr-2" />
        {isLoading ? 'Logging out...' : 'Logout'}
      </DropdownMenuItem>
    </>
  )
}
