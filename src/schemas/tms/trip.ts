import { z } from 'zod';
import { TmsTripStatusEnum } from '@/db/types';
import { tmsExpenseInsertSchema } from './expense';
import { tmsGpsPingInsertSchema } from './gps_ping';
import { tmsProofOfDeliveryInsertSchema } from './proof_of_delivery';
import { tmsTripStopInsertSchema } from './trip_stop';

export const tmsTripSchema = z.object({
  id: z.string(),
  routeId: z.uuid(),
  driverId: z.uuid(),
  vehicleId: z.uuid(),
  status: z.enum(TmsTripStatusEnum).nullable(),
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
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
