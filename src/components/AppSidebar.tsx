'use client'

import { Calendar, Home, Inbox, UserSearch, Brain } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
  {
    title: 'Inicio',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Calendario',
    url: 'calendario',
    icon: Calendar,
  },
  {
    title: 'Clientes',
    url: 'clientes',
    icon: UserSearch,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const slug = pathname.split('/').filter(Boolean)[0] || ''

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard">
                <Brain className="text-pink-500" />
                <span>Therapy Link</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={slug === item.url}>
                    <Link href={`/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.title === 'Inbox' && <SidebarMenuBadge>24</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="#">
                <Image
                  src="/images/logo.png"
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>Creado por MRO</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
