import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db/types';

export const tmsProofOfDeliverySchema = z.object({
  id: z.string(),
  tripId: z.string(),
  type: z.enum(TmsProofTypeEnum).nullable(),
  fileUrl: z.string().nullable(),
  notes: z.string().nullable(),
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
