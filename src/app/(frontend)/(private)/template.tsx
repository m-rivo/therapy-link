import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { getUser } from './actions/getUser'
import { AppSidebar } from '@/components/AppSidebar'
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cookies } from 'next/headers'

const Template: React.FC<{ children: ReactNode }> = async ({ children }) => {
  /*   const user = await getUser()
  if (!user) {
    // if there's no user, we can redirect the browser back to the login route
    redirect('/login')
  } */
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  // if there is, we can show the page content
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}

export default Template
