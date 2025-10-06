import { z } from 'zod';
import { TmsShipmentLegStatusEnum } from '@/db/types';
import { tmsShipmentLegEventInsertSchema } from './shipment_leg_event';

export const tmsShipmentLegSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  carrierId: z
    .uuid({ message: 'Invalid UUID format for carrier ID' })
    .nullable(),
  endLocation: z
    .string({ message: 'End location must be a string' })
    .min(1, { error: 'End location is required' })
    .max(255, { error: 'End location must be at most 255 characters' })
    .nullable(),
  internalTripId: z
    .uuid({ message: 'Invalid UUID format for internal trip ID' })
    .nullable(),
  legSequence: z
    .number({ message: 'Leg sequence must be a number' })
    .int({ message: 'Leg sequence must be an integer' })
    .min(0, { message: 'Leg sequence must be at least 0' }),
  status: z
    .enum(TmsShipmentLegStatusEnum, { message: 'Invalid shipment leg status' })
    .nullable(),
  shipmentId: z
    .uuid({ message: 'Invalid UUID format for shipment ID' })
    .nullable(),
  startLocation: z
    .string({ message: 'Start location must be a string' })
    .min(1, { error: 'Start location is required' })
    .max(255, { error: 'Start location must be at most 255 characters' })
    .nullable(),
  createdAt: z.iso
    .datetime({ message: 'Invalid date format for created at' })
    .nullable(),
  updatedAt: z.iso
    .datetime({ message: 'Invalid date format for updated at' })
    .nullable(),
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
