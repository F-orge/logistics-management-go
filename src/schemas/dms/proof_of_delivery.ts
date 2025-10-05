import { z } from 'zod';
import { DmsProofOfDeliveryTypeEnum } from '@/db/types';

export const dmsProofOfDeliverySchema = z.object({
  id: z.uuid(),
  deliveryTaskId: z.uuid(),
  type: z.enum(DmsProofOfDeliveryTypeEnum).nullable(),
  fileUrl: z
    .url()
    .min(1, { error: 'File URL is required' })
    .max(1024, { error: 'File URL must be at most 1024 characters' })
    .nullable(),
  notes: z
    .string()
    .min(1, { error: 'Notes are required' })
    .max(1024, { error: 'Notes must be at most 1024 characters' })
    .nullable(),
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
