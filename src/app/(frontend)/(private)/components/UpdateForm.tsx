'use client'

import React, { ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { update, UpdateResponse } from '../actions/update'
import type { Customer } from '@/payload-types'
import { FormContainer } from '@/components/CustomerForm/FormContainer'
import { Field, FieldLabel, FieldGroup, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export default function UpdateForm({
  user,
  tiers,
}: {
  user: Customer
  tiers: Customer['tier'][]
}): ReactElement {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('correo') as string
    const firstName = formData.get('nombre') as string
    const lastName = formData.get('apellido') as string

    const result: UpdateResponse = await update({ email, lastName, firstName })

    setIsLoading(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occurred.')
    }
  }

  return (
    <FormContainer heading="Tu cuenta">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                required
                defaultValue={user.firstName || ''}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="apellido">Apellido</FieldLabel>
              <Input
                id="apellido"
                name="apellido"
                type="text"
                required
                defaultValue={user.lastName || ''}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="correo">Correo</FieldLabel>
              <Input
                id="correo"
                name="correo"
                type="email"
                required
                defaultValue={user.email || ''}
              />
            </Field>
          </FieldGroup>
        </FieldSet>
        <fieldset className="flex flex-wrap gap-4 justify-around items-center">
          <legend>Tu plan:</legend>
          {tiers.map((tier, index) => (
            <div key={index}>
              <input
                className="inert:opacity-60"
                inert
                id={tier!}
                readOnly
                type="radio"
                checked={tier === user.tier}
              />
              <label className="ms-2" htmlFor={tier!}>
                {tier}
              </label>
            </div>
          ))}
        </fieldset>
        {error && <div className="text-red-400">{error}</div>}
        <SubmitButton loading={isLoading} text="Actualizar cuenta" />
      </form>
    </FormContainer>
  )
}
