'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { format, parse, setHours, setMinutes, formatISO } from 'date-fns'
import { useRouter } from 'next/navigation'
import type { CalendarEvent, EventColor } from './'
import { DefaultEndHour, DefaultStartHour, EndHour, StartHour } from '../constants'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CalendarX } from 'lucide-react'
import { crearCita } from '../actions/crearCita'
import { Response } from '@/lib/types'
import { toast } from 'sonner'
import { eliminarCita } from '../actions/eliminarCita'
import { actualizarCita } from '../actions/actualizarCita'
import SubmitButton from '@/components/CustomerForm/SubmitButton'
import InputDatePicker from '@/components/InputDatePicker'
import { Controller, useForm } from 'react-hook-form'
import { citaSchema, TCitaSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldError } from '@/components/ui/field'
import { es } from 'date-fns/locale'

interface EventDialogProps {
  event: CalendarEvent | null
  isOpen: boolean
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
}

export function EventDialog({ event, isOpen, onClose, onSave, onDelete }: EventDialogProps) {
  const [allDay, setAllDay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { refresh } = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCitaSchema>({
    resolver: zodResolver(citaSchema),
  })

  useEffect(() => {
    console.log('EventDialog received event:', event)
    if (!event?.id) {
      reset({
        fecha: format(event?.start || new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es }),
        hora: undefined,
      })
      return
    }

    reset({
      fecha: format(event.start, "dd 'de' MMMM 'de' yyyy", { locale: es }),
      hora: formatTimeForInput(event.start),
    })
  }, [event, reset])

  const formatTimeForInput = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = Math.floor(date.getMinutes() / 15) * 15
    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }

  // Memoize time options so they're only calculated once
  const timeOptions = useMemo(() => {
    const options = []
    for (let hour = StartHour; hour <= EndHour; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = hour.toString().padStart(2, '0')
        const formattedMinute = minute.toString().padStart(2, '0')
        const value = `${formattedHour}:${formattedMinute}`
        // Use a fixed date to avoid unnecessary date object creations
        const date = new Date(2000, 0, 1, hour, minute)
        const label = format(date, 'h:mm a')
        options.push({ value, label })
      }
    }
    return options
  }, []) // Empty dependency array ensures this only runs once

  const onSubmit = async (data: TCitaSchema) => {
    setIsLoading(true)

    const parsedDate = parse(data.fecha, "dd 'de' MMMM 'de' yyyy", new Date(), { locale: es })

    /* 
    const start = new Date(fecha)
    
    if (!allDay) {
      const [startHours = 0, startMinutes = 0] = hora.split(':').map(Number)

      if (startHours < StartHour || startHours > EndHour) {
        setError(`Selected time must be between ${StartHour}:00 and ${EndHour}:00`)
        return
      }

      start.setHours(startHours, startMinutes, 0)
    } else {
      start.setHours(0, 0, 0, 0)
    } */

    const horaString = data.hora

    const [horas, minutos] = horaString.split(':').map(Number)

    let combinedDate = parsedDate
    combinedDate = setHours(combinedDate, horas)
    combinedDate = setMinutes(combinedDate, minutos)

    const finalISOString = formatISO(combinedDate)

    let response: Response

    if (event?.id) {
      response = await actualizarCita(Number(event?.id), finalISOString)
    } else {
      response = await crearCita(finalISOString)
    }

    if (response.success) {
      toast.success(response.message)
      refresh()
      onClose()
    } else {
      toast.error(response.error)
    }
    setIsLoading(false)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    if (event?.id) {
      const response = await eliminarCita(Number(event?.id))

      if (response.success) {
        toast.success(response.message)
        refresh()
        onClose()
      } else toast.error(response.error)
    }
    setIsLoading(false)
  }

  // Updated color options to match types.ts
  const colorOptions: Array<{
    value: EventColor
    label: string
    bgClass: string
    borderClass: string
  }> = [
    {
      value: 'sky',
      label: 'Sky',
      bgClass: 'bg-sky-400 data-[state=checked]:bg-sky-400',
      borderClass: 'border-sky-400 data-[state=checked]:border-sky-400',
    },
    {
      value: 'amber',
      label: 'Amber',
      bgClass: 'bg-amber-400 data-[state=checked]:bg-amber-400',
      borderClass: 'border-amber-400 data-[state=checked]:border-amber-400',
    },
    {
      value: 'violet',
      label: 'Violet',
      bgClass: 'bg-violet-400 data-[state=checked]:bg-violet-400',
      borderClass: 'border-violet-400 data-[state=checked]:border-violet-400',
    },
    {
      value: 'rose',
      label: 'Rose',
      bgClass: 'bg-rose-400 data-[state=checked]:bg-rose-400',
      borderClass: 'border-rose-400 data-[state=checked]:border-rose-400',
    },
    {
      value: 'emerald',
      label: 'Emerald',
      bgClass: 'bg-emerald-400 data-[state=checked]:bg-emerald-400',
      borderClass: 'border-emerald-400 data-[state=checked]:border-emerald-400',
    },
    {
      value: 'orange',
      label: 'Orange',
      bgClass: 'bg-orange-400 data-[state=checked]:bg-orange-400',
      borderClass: 'border-orange-400 data-[state=checked]:border-orange-400',
    },
  ]

  const cancelar = () => {
    onClose()
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{event?.id ? 'Reagendar cita' : 'Agenar cita'}</DialogTitle>
          <DialogDescription className={event?.id ? '' : 'sr-only'}>
            {event?.id ? 'Cambia la fecha y hora de la cita' : 'Crea una nueva cita'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-4 py-4">
            <div className="min-w-56">
              <Controller
                name="fecha"
                control={control}
                //defaultValue={formatDate(event?.start || new Date())}
                render={({ field }) => (
                  <InputDatePicker
                    id="fecha"
                    value={field.value}
                    onChange={field.onChange}
                    label="Fecha"
                    disabled={isSubmitting || isLoading}
                    defaultDate={event?.start || new Date()}
                  />
                )}
              />
              <FieldError errors={[{ message: errors.fecha?.message }]} />
            </div>

            {!allDay && (
              <div className="min-w-28 *:not-first:mt-3">
                <Label htmlFor="hora">Hora</Label>
                <Controller
                  name="hora"
                  control={control}
                  //defaultValue={event?.id ? formatTimeForInput(event?.start) : undefined}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting || isLoading}
                    >
                      <SelectTrigger id="hora">
                        <SelectValue placeholder="Seleccione una hora" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[{ message: errors.hora?.message }]} />
              </div>
            )}
          </div>
          <DialogFooter className="flex-row sm:justify-between">
            {event?.id && (
              <SubmitButton
                loading={isLoading}
                text={
                  <>
                    <CalendarX /> Cancelar cita
                  </>
                }
                type="button"
                variant="destructive"
                ariaLabel="cancelar cita"
                onClick={handleDelete}
              />
            )}
            <div className="flex flex-1 justify-end gap-2">
              <Button
                variant="outline"
                onClick={cancelar}
                type="button"
                disabled={isSubmitting || isLoading}
              >
                Cancelar
              </Button>
              <SubmitButton loading={isSubmitting} text={event?.id ? 'Reagendar' : 'Agendar'} />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
