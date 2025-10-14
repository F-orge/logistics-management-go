import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db.types';

export const ProofOfDeliverySchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  filePath: z.string().optional().nullable(),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z.date(),
  type: z.enum(TmsProofTypeEnum).nullable().optional(),
  tripStopId: z.uuid({ message: 'Invalid UUID format for trip stop ID' }),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsProofOfDelivery = z.infer<typeof ProofOfDeliverySchema>;

export const ProofOfDeliveryInsertSchema = ProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const ProofOfDeliveryUpdateSchema =
  ProofOfDeliveryInsertSchema.partial();
