'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from './getUser'
import type { Customer } from '@/payload-types'

interface UpdateParams {
  //email: string
  firstName: string
  lastName: string
  birthDate?: string
  phoneNumber?: string
}

export interface UpdateResponse {
  success: boolean
  error?: string
}

export async function update({
  //email,
  firstName,
  lastName,
  phoneNumber,
  birthDate,
}: UpdateParams): Promise<UpdateResponse> {
  const payload = await getPayload({ config })
  const user = (await getUser()) as Customer

  // this will allow us to update the information presented in the dashboard
  try {
    await payload.update({
      collection: 'customers',
      id: user.id,
      data: { /* email, */ firstName, lastName, phoneNumber, birthDate },
    })
  } catch (e) {
    console.log('Error de actualización: ', e)
    return { success: false, error: 'An error occurred' }
  }
  return { success: true }
}
