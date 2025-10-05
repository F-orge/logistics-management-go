import { z } from 'zod';
import { TmsShipmentLegStatusEnum } from '@/db/types';
import { tmsShipmentLegEventInsertSchema } from './shipment_leg_event';

export const tmsShipmentLegSchema = z.object({
  id: z.uuid(),
  tripId: z.uuid(),
  status: z.enum(TmsShipmentLegStatusEnum).nullable(),
  origin: z
    .string()
    .min(1, { error: 'Origin is required' })
    .max(255, { error: 'Origin must be at most 255 characters' }),
  destination: z
    .string()
    .min(1, { error: 'Destination is required' })
    .max(255, { error: 'Destination must be at most 255 characters' }),
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
