import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db/types';

export const tmsProofOfDeliverySchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  tripId: z.uuid({ message: 'Invalid UUID format for trip ID' }),
  type: z.enum(TmsProofTypeEnum, { message: 'Invalid proof type' }).optional(),
  filePath: z
    .string({ message: 'File path must be a string' })
    .min(1, { error: 'File path is required' })
    .max(1024, { error: 'File path must be at most 1024 characters' })
    .optional(),
  latitude: z.coerce
    .number({ message: 'Latitude must be a number' })
    .min(-90, { error: 'Latitude must be at least -90' })
    .max(90, { error: 'Latitude must be at most 90' }),
  longitude: z.coerce
    .number({ message: 'Longitude must be a number' })
    .min(-180, { error: 'Longitude must be at least -180' })
    .max(180, { error: 'Longitude must be at most 180' }),
  timestamp: z.date({ message: 'Invalid date format for timestamp' }),
  tripStopId: z.uuid({ message: 'Invalid UUID format for trip stop ID' }),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
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
