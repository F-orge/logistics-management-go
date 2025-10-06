import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db/types';

export const tmsProofOfDeliverySchema = z.object({
  id: z.uuid(),
  tripId: z.uuid(),
  type: z.enum(TmsProofTypeEnum).nullable(),
  filePath: z
    .string()
    .min(1, { error: 'File URL is required' })
    .max(1024, { error: 'File URL must be at most 1024 characters' })
    .nullable(),
  latitude: z.coerce
    .number()
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number()
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z.iso.datetime(),
  tripStopId: z.uuid(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsProofOfDelivery = z.infer<typeof tmsProofOfDeliverySchema>;

export const tmsProofOfDeliveryInsertSchema = tmsProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const tmsProofOfDeliveryUpdateSchema =
  tmsProofOfDeliveryInsertSchema.partial();
