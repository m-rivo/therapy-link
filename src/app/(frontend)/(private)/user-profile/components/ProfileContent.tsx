'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputDatePicker from '@/components/InputDatePicker'
import { Customer } from '@/payload-types'
import { update, UpdateResponse } from '../../actions/update'
import { toast } from 'sonner'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { Button } from '@/components/ui/button'
import { parse, isValid } from 'date-fns'
import { es } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { TProfileSchema, profileSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'

export default function ProfileContent({
  user,
  isEditing,
  setIsEditing,
}: {
  user: Customer
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}) {
  const router = useRouter()

  function formatDate(date: Date | undefined) {
    if (!date) {
      return ''
    }

    return date.toLocaleDateString('es-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TProfileSchema>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: TProfileSchema) => {
    const parsedDate = parse(data.birthDate, "dd 'de' MMMM 'de' yyyy", new Date(), { locale: es })

    let birthDateISO: string | undefined

    if (isValid(parsedDate)) {
      birthDateISO = parsedDate.toISOString()
    }

    const result: UpdateResponse = await update({
      ...data,
      birthDate: birthDateISO,
    })

    if (result.success) {
      toast.success('Guardado con éxito')
      router.refresh()
    } else {
      toast.error('Error')
    }

    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldSet>
                <FieldGroup className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="firstName">Nombre *</FieldLabel>
                    <Input
                      {...register('firstName')}
                      id="firstName"
                      type="firstName"
                      name="firstName"
                      defaultValue={user.firstName || ''}
                      disabled={!isEditing}
                    />
                    <FieldError errors={[{ message: errors.firstName?.message }]} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Apellido *</FieldLabel>
                    <Input
                      {...register('lastName')}
                      id="lastName"
                      type="lastName"
                      name="lastName"
                      defaultValue={user.lastName || ''}
                      disabled={!isEditing}
                    />
                    <FieldError errors={[{ message: errors.lastName?.message }]} />
                  </Field>
                  {/* <Field>
                    <FieldLabel htmlFor="email">Correo Electrónico *</FieldLabel>
                    <Input
                      {...register('email')}
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={user.email || ''}
                      disabled={!isEditing}
                    />
                    <FieldError errors={[{ message: errors.email?.message }]} />
                  </Field> */}
                  <Field>
                    <FieldLabel htmlFor="phoneNumber">Número de Teléfono</FieldLabel>
                    <Input
                      {...register('phoneNumber')}
                      id="phoneNumber"
                      type="phoneNumber"
                      name="phoneNumber"
                      defaultValue={user.phoneNumber || ''}
                      disabled={!isEditing}
                    />
                    <FieldError errors={[{ message: errors.phoneNumber?.message }]} />
                  </Field>
                  {user.birthDate || isEditing ? (
                    <div className="space-y-2">
                      <Controller
                        name="birthDate"
                        control={control}
                        defaultValue={formatDate(new Date(user.birthDate || new Date()))}
                        render={({ field }) => (
                          <InputDatePicker
                            id="birthDate"
                            value={field.value}
                            onChange={field.onChange}
                            label="Fecha de Nacimiento"
                            disabled={!isEditing}
                            defaultDate={new Date(user.birthDate || new Date())}
                          />
                        )}
                      />
                      <FieldError errors={[{ message: errors.birthDate?.message }]} />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                      <Input id="birthDate" defaultValue="" disabled={!isEditing} />
                    </div>
                  )}
                </FieldGroup>
              </FieldSet>
              <div className="flex justify-end items-end">
                {isEditing && (
                  <>
                    <SubmitButton loading={isSubmitting} text="Guardar" />
                    <Button
                      onClick={() => {
                        reset()
                        setIsEditing(false)
                      }}
                      variant="secondary"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
