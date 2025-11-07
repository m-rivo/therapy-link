'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputDatePicker from '@/components/InputDatePicker'
import { Customer } from '@/payload-types'
import { useState } from 'react'
import { update, UpdateResponse } from '../../actions/update'
import { toast } from 'sonner'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import { Button } from '@/components/ui/button'
import { parse, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ProfileContent({ user }: { user: Customer }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    const email = formData.get('email') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const birthDateString = formData.get('birthDate') as string

    const parsedDate = parse(birthDateString, "dd 'de' MMMM 'de' yyyy", new Date(), { locale: es })

    let birthDateISO: string | undefined

    if (isValid(parsedDate)) {
      birthDateISO = parsedDate.toISOString()
    }

    const result: UpdateResponse = await update({
      email,
      lastName,
      firstName,
      phoneNumber,
      birthDate: birthDateISO,
    })

    if (result.success) {
      //router.push('/user-profile')
      toast.success('Guardado con éxito')
    } else {
      toast.error(error)
    }

    setIsLoading(false)
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
            <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={user.firstName || ''}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={user.lastName || ''}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  defaultValue={user.email || ''}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Número de Teléfono</Label>
                <Input
                  id="phone"
                  name="phoneNumber"
                  defaultValue={user.phoneNumber || ''}
                  disabled={!isEditing}
                />
              </div>
              {user.birthDate || isEditing ? (
                <div className="space-y-2">
                  <InputDatePicker
                    id="birthDate"
                    label="Fecha de Nacimiento"
                    defaultDate={new Date(user.birthDate || new Date())}
                    disabled={!isEditing}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                  <Input id="birthDate" defaultValue="" disabled={!isEditing} />
                </div>
              )}
              <div className="flex justify-end items-end">
                {isEditing ? (
                  <>
                    <SubmitButton loading={isLoading} text="Guardar" />
                    <Button onClick={() => setIsEditing(false)} variant="secondary">
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>Editar</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
