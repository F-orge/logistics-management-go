import { z } from 'zod';
import { TmsProofTypeEnum } from '@/db/types';

export const tmsProofOfDeliverySchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  deliveryImage: z.string().optional().nullable(),
  deliveryStatus: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  recipientName: z.string().optional().nullable(),
  signature: z.string().optional().nullable(),
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

export type TmsProofOfDelivery = z.infer<typeof tmsProofOfDeliverySchema>;

export const tmsProofOfDeliveryInsertSchema = tmsProofOfDeliverySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  timestamp: true,
});

export const tmsProofOfDeliveryUpdateSchema =
  tmsProofOfDeliveryInsertSchema.partial();
