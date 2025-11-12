import { z } from 'zod'

export const profileSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  //email: z.email('Correo inválido').min(1, 'El correo es obligatorio'),
  phoneNumber: z.string(), //.min(1, 'El número de teléfono es obligatorio'),
  birthDate: z.string(), //.min(1, 'La fecha de nacimiento es obligatoria'),
})

export type TProfileSchema = z.infer<typeof profileSchema>

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

export interface AuthResponse {
  success: boolean
  error?: string
}
