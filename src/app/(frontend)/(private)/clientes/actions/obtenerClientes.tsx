'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'
import type { Customer } from '@/payload-types'

type FetchClientesResponse = Response & {
  data?: Customer[]
  totalPages?: number
  totalDocs?: number
}

//TODO: solo para rol psico
export async function obtenerClientes(page: number, limit: number): Promise<FetchClientesResponse> {
  const payload = await getPayload({ config })

  try {
    const user = await getUser()

    if (!user) return { success: false, error: 'No hay un usuario autenticado' }

    const find = await payload.find({
      collection: 'customers',
      page,
      limit,
    })

    if (find.totalDocs === 0) {
      return { success: true, data: [] }
    } else {
      return {
        success: true,
        data: find.docs,
        totalPages: find.totalPages,
        totalDocs: find.totalDocs,
      }
    }
  } catch (e) {
    console.error('Error: ', e)
    return { success: false, error: 'Ocurrió un error' }
  }
}
