import { z } from 'zod';
// Import enums if needed from '@/db/types'

export const dmsCustomerTrackingLinkSchema = z.object({
  id: z.uuid(),
  routeId: z.uuid(),
  token: z
    .string()
    .min(1, { error: 'Token is required' })
    .max(255, { error: 'Token must be at most 255 characters' }),
  expiresAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
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
