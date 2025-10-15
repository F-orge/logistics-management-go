import { z } from 'zod'
// Import enums if needed from '@/db/types'

export const dmsCustomerTrackingLinkSchema = z.object({
  id: z.uuid(),
  deliveryTaskId: z.uuid(),
  trackingToken: z
    .string()
    .min(1, { error: 'Tracking token is required' })
    .max(255, { error: 'Tracking token must be at most 255 characters' }),
  expiresAt: z.date().optional().nullable(),
  accessCount: z.coerce.number().int().min(0).optional().nullable(),
  isActive: z.boolean().optional().nullable(),
  lastAccessedAt: z.date().optional().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
})

export type DmsCustomerTrackingLink = z.infer<typeof dmsCustomerTrackingLinkSchema>

export const dmsCustomerTrackingLinkInsertSchema = dmsCustomerTrackingLinkSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const dmsCustomerTrackingLinkUpdateSchema = dmsCustomerTrackingLinkInsertSchema.partial()
