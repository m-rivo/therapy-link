'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { ForgotPassword, ForgotPasswordResponse } from '../actions/forgotPassword'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Field, FieldGroup, FieldSet, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function ForgotForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('correo') as string

    setIsLoading(false)

    const result: ForgotPasswordResponse = await ForgotPassword({ email })

    if (result.success) {
      router.push(
        `/login?message=${encodeURIComponent('Las instrucciones para reestablecer tu contraseña han sido enviadas a tu correo.')}`,
      )
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return (
    <FormContainer heading="¿Olvidaste tu contraseña?">
      <div className="w-full mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="correo">Correo</FieldLabel>
                <Input id="correo" name="correo" type="email" required />
              </Field>
            </FieldGroup>
          </FieldSet>
          {error && <div className="text-red-400">{error}</div>}
          <SubmitButton loading={isLoading} text="Reestablecer contraseña" />
        </form>
      </div>
    </FormContainer>
  )
}
