'use client'

import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { create, CreateResponse } from '../actions/create'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
//import Input from '@/components/CustomerForm/Input'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { Field, FieldSet, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function CreateForm(): ReactElement {
  // create loading states using the useState hook. The default should be false.
  const [isLoading, setIsLoading] = useState(false)
  // as well as some error states. Default should be null
  const [error, setError] = useState<string | null>(null)
  // and then initialize the router
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('correo') as string
    const password = formData.get('contrasena') as string
    const confirmPassword = formData.get('confirm-contrasena') as string
    const firstName = formData.get('nombre') as string
    const lastName = formData.get('apellido') as string
    //const username = formData.get('usuario') as string

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    console.log({
      email,
      password,
      lastName,
      firstName,
    })

    const result: CreateResponse = await create({
      email,
      password,
      lastName,
      firstName,
      //username
    })

    setIsLoading(false)

    if (result.success) {
      router.push(`/login?message=${encodeURIComponent('Check your email to verify your account')}`)
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return (
    <FormContainer heading="Crea una cuenta">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input id="nombre" name="nombre" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellido">Apellido</FieldLabel>
              <Input id="apellido" name="apellido" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="correo">Correo</FieldLabel>
              <Input id="correo" name="correo" type="email" required />
            </Field>
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
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Crear cuenta" />
      </form>
      <div className="mt-4">
        <p className="text-sm">
          Ya tienes una cuenta?{' '}
          <Link className="underline underline-offset-4" href="/login">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </FormContainer>
  )
}
