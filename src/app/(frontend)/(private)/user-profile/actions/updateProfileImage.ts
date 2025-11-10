'use server'

import { getUser } from '../../actions/getUser'
import { Customer } from '@/payload-types'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export async function updateProfileImageAction(
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const media = formData.get('file')

    if (!media || !(media instanceof File)) {
      throw new Error('No se recibió un archivo válido.')
    }

    const user = (await getUser()) as Customer
    const payload = await getPayload({ config: payloadConfig })

    const mediaFormData = new FormData()
    mediaFormData.append('file', media)
    mediaFormData.append(
      '_payload',
      JSON.stringify({
        alt: `${user.firstName} ${user.lastName}`,
      }),
    )

    const mediaResponse = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media`, {
      method: 'POST',
      body: mediaFormData,
    })

    const mediaData = await mediaResponse.json()

    if (!mediaData?.doc?.id) {
      throw new Error('Hubo un error al crear media.')
    }
    const mediaId = mediaData.doc.id

    await payload.update({
      collection: 'customers',
      id: user.id,
      data: { profileImage: mediaId },
    })

    return { success: true, message: 'Imagen de perfil actualizada con éxito.' }
  } catch (e) {
    console.error(e)

    return { success: false, message: 'Hubo un error al actualizar la imagen.' }
  }
}
