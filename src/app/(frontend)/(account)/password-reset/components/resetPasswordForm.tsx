'use client'

import React, { ReactElement, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { resetPassword, ResetPasswordResponse } from '../actions/resetPassword'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Field, FieldLabel, FieldSet, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function ResetForm({ token }: { token: string }): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const password = formData.get('contrasena') as string
    const confirmPassword = formData.get('confirm-contrasena') as string

    if (password !== confirmPassword) {
      setError('Las contraseñas no conciden')
      setIsLoading(false)
      return
    }

    const result: ResetPasswordResponse = await resetPassword({ token, password })

    setIsLoading(false)

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Contraseña actualizada correctamente. Inicia sesión con tu nueva contraseña.')}`,
      )
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  return (
    <FormContainer heading="Cambia tu contraseña">
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="contrasena">Contraseña</FieldLabel>
                <Input id="contrasena" name="contrasena" type="password" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-contrasena">Confirma Contraseña</FieldLabel>
                <Input id="confirm-contrasena" name="confirm-contrasena" type="password" required />
              </Field>
            </FieldGroup>
          </FieldSet>
          <SubmitButton loading={isLoading} text="Cambiar contraseña" />
        </form>
      </div>
    </FormContainer>
  )
}
