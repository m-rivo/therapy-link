import { z } from 'zod'

//Perfil de usuario
export const profileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  //email: z.email('Correo inválido').min(1, 'El correo es obligatorio'),
  phoneNumber: z.string(), //.min(1, 'El número de teléfono es obligatorio'),
  birthDate: z.string(), //.min(1, 'La fecha de nacimiento es obligatoria'),
})

export type TProfileSchema = z.infer<typeof profileSchema>

//Cita
export const citaSchema = z.object({
  fecha: z.string().min(1, 'La fecha es obligatoria'),
  hora: z.string().min(1, 'La hora es obligatoria'),
})

export type TCitaSchema = z.infer<typeof citaSchema>

/* export const signUpSchema = z
  .object({
    email: z.email(),
    password: z.string().min(10, 'Password must be at least 10 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type TSignUpSchema = z.infer<typeof signUpSchema> */

export interface Response {
  success: boolean
  error?: string
  message?: string
}
