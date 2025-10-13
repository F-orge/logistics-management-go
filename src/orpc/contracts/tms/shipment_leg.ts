import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsShipmentLegInsertSchema,
  tmsShipmentLegSchema,
  tmsShipmentLegUpdateSchema,
} from '@/schemas/tms/shipment_leg';

export const paginateShipmentLegContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsShipmentLegSchema),
        sort: sortTransformer(tmsShipmentLegSchema),
      }),
    ),
  )
  .output(z.array(tmsShipmentLegSchema));

export const rangeShipmentLegContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsShipmentLegSchema),
        sort: sortTransformer(tmsShipmentLegSchema),
      }),
    ),
  )
  .output(z.array(tmsShipmentLegSchema));

export const inShipmentLegContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsShipmentLegSchema));

export const createShipmentLegContract = oc
  .input(tmsShipmentLegInsertSchema)
  .output(tmsShipmentLegSchema);

export const updateShipmentLegContract = oc
  .input(z.object({ id: z.uuid(), value: tmsShipmentLegUpdateSchema }))
  .output(tmsShipmentLegSchema);

export const deleteShipmentLegContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
