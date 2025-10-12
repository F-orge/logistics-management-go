import { z } from 'zod';
import { TmsTripStatusEnum } from '@/db/types';
import { tmsExpenseInsertSchema } from './expense';
import { tmsGpsPingInsertSchema } from './gps_ping';
import { tmsProofOfDeliveryInsertSchema } from './proof_of_delivery';
import { tmsTripStopInsertSchema } from './trip_stop';

export const tmsTripSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  driverId: z
    .uuid({ message: 'Invalid UUID format for driver ID' })
    .optional()
    .nullable(),
  vehicleId: z
    .uuid({ message: 'Invalid UUID format for vehicle ID' })
    .optional()
    .nullable(),
  status: z
    .enum(TmsTripStatusEnum, { message: 'Invalid trip status' })
    .optional()
    .nullable(),
  endLocation: z.string().optional().nullable(),
  endTime: z.date().optional().nullable(),
  startLocation: z.string().optional().nullable(),
  startTime: z.date().optional().nullable(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional()
    .nullable(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional()
    .nullable(),
});

export type TmsTrip = z.infer<typeof tmsTripSchema>;

export const tmsTripInsertSchema = tmsTripSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    stops: z.array(tmsTripStopInsertSchema).optional().nullable(),
    expenses: z.array(tmsExpenseInsertSchema).optional().nullable(),
    gpsPings: z.array(tmsGpsPingInsertSchema).optional().nullable(),
    proofOfDeliveries: z
      .array(tmsProofOfDeliveryInsertSchema)
      .optional()
      .nullable(),
  });

export const tmsTripUpdateSchema = tmsTripInsertSchema.partial();
