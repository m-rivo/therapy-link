'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'

export async function eliminarCita(id: number): Promise<Response> {
  const payload = await getPayload({ config })

  try {
    const user = await getUser()

    if (!user) return { success: false, error: 'No hay un usuario autenticado' }

    const find = await payload.find({
      collection: 'citas',
      where: {
        id: {
          equals: id,
        },
        customer: {
          equals: user.id,
        },
      },
    })
    //TODO: Notificación
    //TODO: Rol de psico?

    if (find.totalDocs === 0) {
      return { success: false, error: 'No existe la cita creada por el usuario' }
    } else {
      try {
        await payload.delete({ collection: 'citas', where: { id: { equals: id } } })
        return { success: true, message: 'Cita cancelada con éxito' }
      } catch (e) {
        console.error(e)
        return { success: false, error: 'Ocurrió un problema al intentar cancelar cita' }
      }
    }
  } catch (e) {
    console.error('Error: ', e)
    return { success: false, error: 'Ocurrió un error' }
  }
}
