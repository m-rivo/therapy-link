import React from 'react'
import LoginForm from './components/loginForm'
import { getUser } from '@/app/(frontend)/(private)/actions/getUser'
import { redirect } from 'next/navigation'
import MessageToast from './components/MessageToast'

interface SearchParams {
  [key: string]: string | undefined
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<React.ReactElement> {
  const user = await getUser()
  if (user) {
    redirect('/dashboard')
  }

  const { message } = await searchParams

  return (
    <div className="h-screen w-full mx-auto sm:max-w-sm">
      <MessageToast message={message} />
      <LoginForm />
    </div>
  )
}
