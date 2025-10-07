import { z } from 'zod';
// Import enums if needed from '@/db/types'

export const dmsCustomerTrackingLinkSchema = z.object({
  id: z.uuid(),
  deliveryTaskId: z.uuid(),
  trackingToken: z
    .string()
    .min(1, { error: 'Tracking token is required' })
    .max(255, { error: 'Tracking token must be at most 255 characters' }),
  expiresAt: z.date().optional(),
  accessCount: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  lastAccessedAt: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type DmsCustomerTrackingLink = z.infer<
  typeof dmsCustomerTrackingLinkSchema
>;

export const dmsCustomerTrackingLinkInsertSchema =
  dmsCustomerTrackingLinkSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const dmsCustomerTrackingLinkUpdateSchema =
  dmsCustomerTrackingLinkInsertSchema.partial();
