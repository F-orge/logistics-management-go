import { z } from 'zod';
import { TmsTripStatusEnum } from '@/db/types';
import { tmsExpenseInsertSchema } from './expense';
import { tmsGpsPingInsertSchema } from './gps_ping';
import { tmsProofOfDeliveryInsertSchema } from './proof_of_delivery';
import { tmsTripStopInsertSchema } from './trip_stop';

export const tmsTripSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  routeId: z.uuid({ message: 'Invalid UUID format for route ID' }),
  driverId: z.uuid({ message: 'Invalid UUID format for driver ID' }),
  vehicleId: z.uuid({ message: 'Invalid UUID format for vehicle ID' }),
  status: z
    .enum(TmsTripStatusEnum, { message: 'Invalid trip status' })
    .optional(),
  startedAt: z
    .date({ message: 'Invalid date format for started at' })
    .optional(),
  completedAt: z
    .date({ message: 'Invalid date format for completed at' })
    .optional(),
  createdAt: z
    .date({ message: 'Invalid date format for created at' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid date format for updated at' })
    .optional(),
});

export type TmsTrip = z.infer<typeof tmsTripSchema>;

export const tmsTripInsertSchema = tmsTripSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    stops: z.array(tmsTripStopInsertSchema).optional(),
    expenses: z.array(tmsExpenseInsertSchema).optional(),
    gpsPings: z.array(tmsGpsPingInsertSchema).optional(),
    proofOfDeliveries: z.array(tmsProofOfDeliveryInsertSchema).optional(),
  });

export const tmsTripUpdateSchema = tmsTripInsertSchema.partial();
