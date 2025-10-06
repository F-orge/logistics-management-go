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
    .nullable(),
  startedAt: z.iso
    .datetime({ message: 'Invalid date format for started at' })
    .nullable(),
  completedAt: z.iso
    .datetime({ message: 'Invalid date format for completed at' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
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
    stops: z.array(tmsTripStopInsertSchema).optional(),
    expenses: z.array(tmsExpenseInsertSchema).optional(),
    gpsPings: z.array(tmsGpsPingInsertSchema).optional(),
    proofOfDeliveries: z.array(tmsProofOfDeliveryInsertSchema).optional(),
  });

export const tmsTripUpdateSchema = tmsTripInsertSchema.partial();
