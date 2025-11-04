'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { login, LoginResponse } from '../../login/actions/login'
import Link from 'next/link'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Field, FieldLabel, FieldGroup, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function LoginForm(): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('correo') as string
    const password = formData.get('contrasena') as string

    const result: LoginResponse = await login({ email, password })

    setIsLoading(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return (
    <FormContainer heading="Inicia sesión">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="correo">Correo</FieldLabel>
              <Input id="correo" name="correo" type="email" required />
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="contrasena">Contraseña</FieldLabel>
              <Input id="contrasena" name="contrasena" type="password" required />
            </Field>
          </FieldGroup>
        </FieldSet>
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Login" />
      </form>
      <div className="mt-4">
        <p className="text-sm ">
          ¿No tienes cuenta?{' '}
          <Link className="underline underline-offset-4" href="/create-account">
            Crea una aquí.
          </Link>
        </p>
      </div>
      <div className="mt-4">
        <Link className=" underline underline-offset-4" href="/forgot-password">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </FormContainer>
  )
}
