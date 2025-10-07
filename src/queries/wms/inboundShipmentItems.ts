import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsInboundShipmentItem,
  removeWmsInboundShipmentItem,
  selectWmsInboundShipmentItems,
  updateWmsInboundShipmentItem,
} from '@/actions/wms/inboundShipmentItems';
import {
  wmsInboundShipmentItemInsertSchema,
  wmsInboundShipmentItemSchema,
  wmsInboundShipmentItemUpdateSchema,
} from '@/schemas/wms/inbound_shipment_item';

export const wmsInboundShipmentItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.inboundShipmentItems', page, perPage],
    queryFn: () =>
      selectWmsInboundShipmentItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsInboundShipmentItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsInboundShipmentItemSchema>,
  void,
  z.infer<typeof wmsInboundShipmentItemInsertSchema>
>({
  mutationFn: (value) => createWmsInboundShipmentItem({ data: value }),
});

export const wmsInboundShipmentItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsInboundShipmentItemSchema>,
    void,
    z.infer<typeof wmsInboundShipmentItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsInboundShipmentItem({ data: { id, value } }),
  });

export const wmsInboundShipmentItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsInboundShipmentItem({ data: { id } }),
});