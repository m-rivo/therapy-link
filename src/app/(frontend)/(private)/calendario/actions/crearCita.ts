'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'
import type { Cita } from '@/payload-types'

export async function crearCita(fechaHora: string): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const find = await payload.find({
      collection: 'citas',
      where: {
        fechaHora: {
          equals: fechaHora,
        },
      },
    })

    const user = await getUser()

    if (!user) return { success: false, error: 'No hay un usuario autenticado' }

    if (find.totalDocs === 0) {
      try {
        const cita: Cita = await payload.create({
          collection: 'citas',
          data: {
            fechaHora,
            customer: user.id,
            estado: 'scheduled',
          },
        })

        console.log(cita)
        return { success: true }
      } catch (e) {
        console.error(e)
        return { success: false, error: 'Hubo un problema al intentar crear cita' }
      }
    } else {
      return { success: false, error: 'Ya existe una cita en esa fecha y hora' }
    }
  } catch (e) {
    console.error('Error: ', e)
    return { success: false, error: 'Ocurrió un error' }
  }
}
