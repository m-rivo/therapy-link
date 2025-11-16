'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'
import type { Cita } from '@/payload-types'

type FetchCitasResponse = Response & { data?: Cita[] }

export async function obtenerCitas(): Promise<FetchCitasResponse> {
  const payload = await getPayload({ config })

  try {
    const user = await getUser()

    if (!user) return { success: false, error: 'No hay un usuario autenticado' }

    const find = await payload.find({
      collection: 'citas',
    })
    //TODO: todos si es rol psico y los del propio usuario si no

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
