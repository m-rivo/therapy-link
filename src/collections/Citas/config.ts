import type { CollectionConfig } from 'payload'

//TODO: el usuario solo puede crear citas para el mismo
// se puede crear citas de mas de una hora (opcional)
// solo puede haber una cita programada a la vez
// solo se pueden crear citas 24hrs antes?
export const Citas: CollectionConfig = {
  slug: 'citas',
  access: {
    create: ({ req }) => (req.user ? true : false),
    read: ({ req }) => (req.user ? true : false),
    update: ({ req }) => (req.user ? true : false),
    delete: ({ req }) => (req.user ? true : false),
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Cliente',
    },
    {
      name: 'fechaHora',
      type: 'date',
      required: true,
      label: 'Fecha y Hora',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'estado',
      type: 'select',
      options: [
        { label: 'Programada', value: 'scheduled' },
        { label: 'Completada', value: 'completed' },
      ],
      defaultValue: 'scheduled',
      required: true,
    },
  ],
}
