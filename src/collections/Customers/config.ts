import type { CollectionConfig } from 'payload'
import { getServerSideURL } from '@/utilities/getServerSideURL'

export const Customers: CollectionConfig = {
  slug: 'customers',
  auth: {
    tokenExpiration: 12 * 60 * 60,
    verify: {
      generateEmailSubject: (args) => {
        return `Hola ${args?.user?.firstName ? args?.user.firstName : args?.user.email}, verifica tu correo!`
      },
      generateEmailHTML: (args) => {
        return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Verifica tu correo</title></head><body style="font-family: Verdana, sans-serif; text-align: center; margin: 0; background-color: #f4f4f4;"><main style="padding: 0 16px;"><h1 style="color: navy; font-size: 2rem; margin-top: 80px;">Verifica tu correo</h1><p style="font-size: 1rem; color: #333;">Hola ${args.user?.firstName ? args.user.firstName : args.user.email},</p><p style="font-size: 1rem; color: #333;">Haz clic en el botón de abajo para verificar tu correo electrónico.</p><div style="margin-top: 40px;"><a href="${getServerSideURL()}/verify?token=${args.token}" style="padding: 16px; background-color: navy; color: white; text-decoration: none; font-size: 1rem; border-radius: 5px;">Verificar mi correo</a></div></main><footer style="margin-top: 80px; background-color: black; height: 100px; color: white; display: flex; justify-content: center; align-items: center;"><p style="font-size: 0.75rem;">Therapy Link &copy; Derechos Reservados</p></footer></body></html>`
      },
    },
    forgotPassword: {
      generateEmailSubject: (args) => {
        // we need to use `args` and conditional chaining here to prevent type issues
        return `Hola ${args?.user?.firstName ? args?.user.firstName : args?.user.email}! Reestablece tu contraseña.`
      },
      generateEmailHTML: (args) => {
        return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Reestablece tu contraseña</title></head><body style="font-family: Verdana, sans-serif; text-align: center; margin: 0; background-color: #f4f4f4;"><main style="padding: 0 16px;"><h1 style="color: navy; font-size: 2rem; margin-top: 80px;">Reestablece tu contraseña</h1><p style="font-size: 1rem; color: #333;">Hola ${args?.user?.firstName ? args?.user.firstName : args?.user.email},</p><p style="font-size: 1rem; color: #333;">Tú (o alguien más) solicitaste reestablecer tu contraseña. Si no fuiste tú, simplemente ignora este correo. De lo contrario puedes reestablecer tu contraseña haciendo clic en el botón de abajo</p><div style="margin-top: 40px;"><a href="${getServerSideURL()}/password-reset?token=${args?.token}" style="padding: 16px; background-color: navy; color: white; text-decoration: none; font-size: 1rem; border-radius: 5px;">Reestablecer mi contraseña</a></div></main><footer style="margin-top: 80px; background-color: black; height: 100px; color: white; display: flex; justify-content: center; align-items: center;"><p style="font-size: 0.75rem;">Therapy Link &copy; Derechos Reservados</p></footer></body></html>`
      },
    },
    cookies: {
      secure: true,
      sameSite: 'None',
      domain: process.env.COOKIE_DOMAIN,
    },
  },
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    create: () => true,
    admin: () => false,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
        },
        {
          name: 'lastName',
          type: 'text',
        },
      ],
    },
    {
      name: 'tier',
      type: 'radio',
      interfaceName: 'tierProps',
      options: ['Free', 'Basic', 'Pro', 'Enterprise'],
      defaultValue: 'Free',
    },
  ],
}
