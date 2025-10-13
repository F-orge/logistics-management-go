import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsShipmentLegEventInsertSchema,
  tmsShipmentLegEventSchema,
  tmsShipmentLegEventUpdateSchema,
} from '@/schemas/tms/shipment_leg_event';

export const paginateShipmentLegEventContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsShipmentLegEventSchema),
        sort: sortTransformer(tmsShipmentLegEventSchema),
      }),
    ),
  )
  .output(z.array(tmsShipmentLegEventSchema));

export const rangeShipmentLegEventContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsShipmentLegEventSchema),
        sort: sortTransformer(tmsShipmentLegEventSchema),
      }),
    ),
  )
  .output(z.array(tmsShipmentLegEventSchema));

export const inShipmentLegEventContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsShipmentLegEventSchema));

export const createShipmentLegEventContract = oc
  .input(tmsShipmentLegEventInsertSchema)
  .output(tmsShipmentLegEventSchema);

export const updateShipmentLegEventContract = oc
  .input(z.object({ id: z.uuid(), value: tmsShipmentLegEventUpdateSchema }))
  .output(tmsShipmentLegEventSchema);

export const deleteShipmentLegEventContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
