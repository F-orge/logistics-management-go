import { z } from 'zod';
import { DmsProofOfDeliveryTypeEnum } from '@/db/types';

export const dmsProofOfDeliverySchema = z.object({
  id: z.string(),
  deliveryTaskId: z.string(),
  type: z.enum(DmsProofOfDeliveryTypeEnum).nullable(),
  fileUrl: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type DmsProofOfDelivery = z.infer<typeof dmsProofOfDeliverySchema>;

export const dmsProofOfDeliveryInsertSchema = dmsProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const dmsProofOfDeliveryUpdateSchema =
  dmsProofOfDeliveryInsertSchema.partial();
