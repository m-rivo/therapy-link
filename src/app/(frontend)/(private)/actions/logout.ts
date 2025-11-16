'use server'

import { cookies } from 'next/headers'
import type { Response } from '@/lib/types'

export async function logout(): Promise<Response> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')

    return { success: true }
  } catch (error) {
    console.error('Error al cerrar sesión.', error)
    return { success: false, error: 'Error al cerrar sesión.' }
  }
}
