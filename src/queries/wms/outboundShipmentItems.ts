import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsOutboundShipmentItem,
  removeWmsOutboundShipmentItem,
  selectWmsOutboundShipmentItems,
  updateWmsOutboundShipmentItem,
} from '@/actions/wms/outboundShipmentItems';
import {
  wmsOutboundShipmentItemInsertSchema,
  wmsOutboundShipmentItemSchema,
  wmsOutboundShipmentItemUpdateSchema,
} from '@/schemas/wms/outbound_shipment_item';

export const wmsOutboundShipmentItemQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.outboundShipmentItems', page, perPage],
    queryFn: () =>
      selectWmsOutboundShipmentItems({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsOutboundShipmentItemCreateMutationOption = mutationOptions<
  z.infer<typeof wmsOutboundShipmentItemSchema>,
  void,
  z.infer<typeof wmsOutboundShipmentItemInsertSchema>
>({
  mutationFn: (value) => createWmsOutboundShipmentItem({ data: value }),
});

export const wmsOutboundShipmentItemUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsOutboundShipmentItemSchema>,
    void,
    z.infer<typeof wmsOutboundShipmentItemUpdateSchema>
  >({
    mutationFn: (value) => updateWmsOutboundShipmentItem({ data: { id, value } }),
  });

export const wmsOutboundShipmentItemRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsOutboundShipmentItem({ data: { id } }),
});