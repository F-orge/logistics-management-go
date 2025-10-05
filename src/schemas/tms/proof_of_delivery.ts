import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db/types';

export const tmsProofOfDeliverySchema = z.object({
  id: z.uuid(),
  tripId: z.uuid(),
  type: z.enum(TmsProofTypeEnum).nullable(),
  fileUrl: z
    .string()
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

export type TmsProofOfDelivery = z.infer<typeof tmsProofOfDeliverySchema>;

export const tmsProofOfDeliveryInsertSchema = tmsProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const tmsProofOfDeliveryUpdateSchema =
  tmsProofOfDeliveryInsertSchema.partial();
