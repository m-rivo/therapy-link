'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { getUser } from '../../actions/getUser'
import type { Response } from '@/lib/types'

//TODO: solo crear citas 24hrs o más de la hora actual
export async function actualizarCita(id: number, fechaHora: string): Promise<Response> {
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

    if (find.totalDocs === 0) {
      return { success: false, error: 'No existe la cita creada por el usuario' }
    } else {
      try {
        const cita = await payload.update({
          collection: 'citas',
          id,
          data: {
            fechaHora,
          },
        })

        console.log(cita)

        return { success: true, message: 'Cita reagendada con éxito' }
        //TODO: Notificación
        //TODO: Rol de psico?
      } catch (e) {
        console.error(e)

        return { success: false, error: 'Ocurrió un problema al intentar reagendar cita' }
      }
    }
  } catch (e) {
    console.error('Error: ', e)
    return { success: false, error: 'Ocurrió un error' }
  }
}
