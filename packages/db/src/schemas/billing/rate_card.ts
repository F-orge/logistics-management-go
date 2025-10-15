import { z } from 'zod'
import { BillingServiceTypeEnum } from '@/db.types'

// Zod schema for .rate_card table
export const RateCardSchema = z
  .object({
    id: z.uuid(),
    createdAt: z.date().optional().nullable(),
    createdByUserId: z
      .string()
      .min(1, { error: 'Created by user ID is required' })
      .max(255, { error: 'Created by user ID must be at most 255 characters' })
      .optional()
      .nullable(),
    description: z
      .string()
      .min(1, { error: 'Description is required' })
      .max(1024, { error: 'Description must be at most 1024 characters' })
      .optional()
      .nullable(),
    isActive: z.boolean().optional().nullable(),
    name: z
      .string()
      .min(1, { error: 'Name is required' })
      .max(255, { error: 'Name must be at most 255 characters' }),
    serviceType: z.enum(BillingServiceTypeEnum),
    updatedAt: z.date().optional().nullable(),
    validFrom: z.date(),
    validTo: z.date().optional().nullable(),
  })
  .strict()

export type BillingRateCard = z.infer<typeof RateCardSchema>

export const RateCardInsertSchema = RateCardSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).strict()

export const RateCardUpdateSchema = RateCardInsertSchema.partial().strict()
