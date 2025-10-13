import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsOutboundShipmentInsertSchema,
  wmsOutboundShipmentSchema,
  wmsOutboundShipmentUpdateSchema,
} from '@/schemas/wms/outbound_shipment';

export const paginateOutboundShipmentContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsOutboundShipmentSchema),
        sort: sortTransformer(wmsOutboundShipmentSchema),
      }),
    ),
  )
  .output(z.array(wmsOutboundShipmentSchema));

export const rangeOutboundShipmentContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsOutboundShipmentSchema),
        sort: sortTransformer(wmsOutboundShipmentSchema),
      }),
    ),
  )
  .output(z.array(wmsOutboundShipmentSchema));

export const inOutboundShipmentContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsOutboundShipmentSchema));

export const createOutboundShipmentContract = oc
  .input(wmsOutboundShipmentInsertSchema)
  .output(wmsOutboundShipmentSchema);

export const updateOutboundShipmentContract = oc
  .input(z.object({ id: z.uuid(), value: wmsOutboundShipmentUpdateSchema }))
  .output(wmsOutboundShipmentSchema);

export const deleteOutboundShipmentContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
