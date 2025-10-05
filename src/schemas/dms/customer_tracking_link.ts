import { z } from 'zod';
// Import enums if needed from '@/db/types'

export const dmsCustomerTrackingLinkSchema = z.object({
  id: z.string(),
  routeId: z.string(),
  token: z.string(),
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
