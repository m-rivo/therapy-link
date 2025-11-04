'use client'
import { ForgotPassword } from '@/app/(frontend)/(account)/forgot-password/actions/forgotPassword'
import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { logout } from '../actions/logout'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export const ResetPasswordButton = ({ email }: { email: string }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await ForgotPassword({ email: email })
    setIsLoading(false)
    setIsClicked(true)
    await logout()
    redirect(`/login?message=${encodeURIComponent('Password reset request sent to your email.')}`)
  }

  return (
    <div>
      <Button
        disabled={isLoading || isClicked}
        className={`${!isClicked ? 'cursor-pointer' : 'cursor-not-allowed'} mt-8 mb-4`}
        type="button"
        onClick={handleClick}
      >
        {isLoading ? 'Loading...' : isClicked ? 'Password reset requested!' : 'Reset Password'}
        <Loader className={`animate-spin ${isLoading ? 'inline-block' : 'hidden'}`} />
      </Button>
      {isClicked && (
        <div>
          <p>Check your email for more instructions.</p>
        </div>
      )}
    </div>
  )
}
