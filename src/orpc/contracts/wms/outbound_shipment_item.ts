import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  wmsOutboundShipmentItemInsertSchema,
  wmsOutboundShipmentItemSchema,
  wmsOutboundShipmentItemUpdateSchema,
} from '@/schemas/wms/outbound_shipment_item';

export const paginateOutboundShipmentItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(wmsOutboundShipmentItemSchema),
        sort: sortTransformer(wmsOutboundShipmentItemSchema),
      }),
    ),
  )
  .output(z.array(wmsOutboundShipmentItemSchema));

export const rangeOutboundShipmentItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(wmsOutboundShipmentItemSchema),
        sort: sortTransformer(wmsOutboundShipmentItemSchema),
      }),
    ),
  )
  .output(z.array(wmsOutboundShipmentItemSchema));

export const inOutboundShipmentItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(wmsOutboundShipmentItemSchema));

export const createOutboundShipmentItemContract = oc
  .input(wmsOutboundShipmentItemInsertSchema)
  .output(wmsOutboundShipmentItemSchema);

export const updateOutboundShipmentItemContract = oc
  .input(z.object({ id: z.uuid(), value: wmsOutboundShipmentItemUpdateSchema }))
  .output(wmsOutboundShipmentItemSchema);

export const deleteOutboundShipmentItemContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
