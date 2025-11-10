'use client'

import { Camera } from 'lucide-react'
import { Dropzone } from './Dropzone'
import { useState } from 'react'

import { updateProfileImageAction } from '../actions/updateProfileImage'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ChangeImageButton() {
  const [files, setFiles] = useState<File[] | undefined>()

  const router = useRouter()

  const handleDrop = async (files: File[]) => {
    if (files.length === 0) return

    const file = files[0]
    setFiles(files)

    const formData = new FormData()

    formData.append('file', file)

    const result = await updateProfileImageAction(formData)

    if (result.success) {
      toast.success(result.message || 'Actualización exitosa.')

      router.refresh()
    } else {
      toast.error(result.message || 'Fallo desconocido.')
    }
  }

  return (
    <Dropzone
      accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <Camera />
    </Dropzone>
  )
}
