import { z } from 'zod'

export const wmsSupplierSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(1, { error: 'Name is required' })
    .max(255, { error: 'Name must be at most 255 characters' }),
  contactPerson: z
    .string({ message: 'Contact person must be a string' })
    .min(1, { error: 'Contact person is required' })
    .max(255, { error: 'Contact person must be at most 255 characters' })
    .optional()
    .nullable(),
  email: z
    .string({ message: 'Email must be a string' })
    .email({ message: 'Invalid email format' })
    .min(1, { error: 'Email is required' })
    .max(255, { error: 'Email must be at most 255 characters' })
    .optional()
    .nullable(),
  phoneNumber: z
    .string({ message: 'Phone number must be a string' })
    .min(1, { error: 'Phone number is required' })
    .max(32, { error: 'Phone number must be at most 32 characters' })
    .optional()
    .nullable(),
  createdAt: z.date({ message: 'Invalid date format for created at' }).optional().nullable(),
  updatedAt: z.date({ message: 'Invalid date format for updated at' }).optional().nullable(),
})

export type WmsSupplier = z.infer<typeof wmsSupplierSchema>

export const wmsSupplierInsertSchema = wmsSupplierSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const wmsSupplierUpdateSchema = wmsSupplierInsertSchema.partial()
