'use server'

import { cookies } from 'next/headers'
import type { AuthResponse } from '@/lib/types'

export async function logout(): Promise<AuthResponse> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('payload-token')

    return { success: true }
  } catch (error) {
    console.error('Error al cerrar sesión.', error)
    return { success: false, error: 'Error al cerrar sesión.' }
  }
}
