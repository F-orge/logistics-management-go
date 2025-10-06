import { z } from 'zod';
import { TmsShipmentLegStatusEnum } from '@/db/types';
import { tmsShipmentLegEventInsertSchema } from './shipment_leg_event';

export const tmsShipmentLegSchema = z.object({
  id: z.uuid(),
  carrierId: z.uuid().nullable(),
  endLocation: z.string().nullable(),
  internalTripId: z.string().nullable(),
  legSequence: z.number(),
  status: z.enum(TmsShipmentLegStatusEnum).nullable(),
  shipmentId: z.uuid().nullable(),
  startLocation: z.string().nullable(),
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
