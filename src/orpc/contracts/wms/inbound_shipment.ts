import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsInboundShipmentInsertSchema,
  wmsInboundShipmentSchema,
  wmsInboundShipmentUpdateSchema,
} from '@/schemas/wms/inbound_shipment';

export const paginateInboundShipmentContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsInboundShipmentSchema),
        sort: sortTransformer(wmsInboundShipmentSchema),
      }),
    ),
  )
  .output(z.array(wmsInboundShipmentSchema));

export const rangeInboundShipmentContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsInboundShipmentSchema),
        sort: sortTransformer(wmsInboundShipmentSchema),
      }),
    ),
  )
  .output(z.array(wmsInboundShipmentSchema));

export const inInboundShipmentContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsInboundShipmentSchema));

export const createInboundShipmentContract = oc
  .input(wmsInboundShipmentInsertSchema)
  .output(wmsInboundShipmentSchema);

export const updateInboundShipmentContract = oc
  .input(z.object({ id: z.uuid(), value: wmsInboundShipmentUpdateSchema }))
  .output(wmsInboundShipmentSchema);

export const deleteInboundShipmentContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
