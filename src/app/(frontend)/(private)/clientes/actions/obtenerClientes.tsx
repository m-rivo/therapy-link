'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'
import type { Customer } from '@/payload-types'

type FetchClientesResponse = Response & { data?: Customer[] }

//TODO: solo para rol psico
export async function obtenerClientes(): Promise<FetchClientesResponse> {
  const payload = await getPayload({ config })

  try {
    const user = await getUser()

    if (!user) return { success: false, error: 'No hay un usuario autenticado' }

    const find = await payload.find({
      collection: 'customers',
    })

    if (find.totalDocs === 0) {
      return { success: true, data: [] }
    } else {
      return { success: true, data: find.docs }
    }
  } catch (e) {
    console.error('Error: ', e)
    return { success: false, error: 'Ocurrió un error' }
  }
}
