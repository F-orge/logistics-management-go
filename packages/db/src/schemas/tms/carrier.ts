import { z } from 'zod'

export const CarrierSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Carrier name must be a string' })
    .min(1, { error: 'Carrier name is required' })
    .max(255, { error: 'Carrier name must be at most 255 characters' }),
  contactDetails: z.string({ message: 'Contact person must be a string' }).optional().nullable(),
  address: z.string({ message: 'Address must be a string' }).optional().nullable(),
  servicesOffered: z.string({ message: 'Services offered must be a string' }).optional().nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type TmsCarrier = z.infer<typeof CarrierSchema>

export const CarrierInsertSchema = CarrierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const CarrierUpdateSchema = CarrierInsertSchema.partial()
