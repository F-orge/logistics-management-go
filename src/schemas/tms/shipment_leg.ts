import { z } from 'zod';
import { TmsShipmentLegStatusEnum } from '@/db/types';
import { tmsShipmentLegEventInsertSchema } from './shipment_leg_event';

export const tmsShipmentLegSchema = z.object({
  id: z.string(),
  tripId: z.string(),
  status: z.enum(TmsShipmentLegStatusEnum).nullable(),
  origin: z.string(),
  destination: z.string(),
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type TmsShipmentLeg = z.infer<typeof tmsShipmentLegSchema>;

export const tmsShipmentLegInsertSchema = tmsShipmentLegSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    events: z.array(tmsShipmentLegEventInsertSchema).optional(),
  });

export const tmsShipmentLegUpdateSchema = tmsShipmentLegInsertSchema.partial();
