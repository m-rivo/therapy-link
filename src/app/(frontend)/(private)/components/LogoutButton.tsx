'use client'
import { LogOut } from 'lucide-react'
import { logout } from '../actions/logout'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogout() {
    setIsLoading(true)
    setError(null)

    const result = await logout()

    setIsLoading(false)
    // if logout is successful, we can send the user back to the login page
    if (result.success) {
      router.push('/login')
    } else {
      // otherwise, we should provide an error
      setError(result.error || 'Logout failed')
    }
  }

  // return a button that handles the logout login
  return (
    <>
      {error && <p className="text-red-400">{error}</p>}
      <DropdownMenuItem variant="destructive" onClick={handleLogout} disabled={isLoading}>
        <LogOut className="size-[1.2rem] mr-2" />
        {isLoading ? 'Logging out...' : 'Logout'}
      </DropdownMenuItem>
    </>
  )
}
/* 
<div className="flex items-center justify-start gap-4">
        <LogOut size={24} />
        <p>Logout</p>
      </div>
*/
