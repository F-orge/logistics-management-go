import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createWmsOutboundShipment,
  removeWmsOutboundShipment,
  selectWmsOutboundShipments,
  updateWmsOutboundShipment,
} from '@/actions/wms/outboundShipments';
import {
  wmsOutboundShipmentInsertSchema,
  wmsOutboundShipmentSchema,
  wmsOutboundShipmentUpdateSchema,
} from '@/schemas/wms/outbound_shipment';

export const wmsOutboundShipmentQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.outboundShipments', page, perPage],
    queryFn: () =>
      selectWmsOutboundShipments({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsOutboundShipmentCreateMutationOption = mutationOptions<
  z.infer<typeof wmsOutboundShipmentSchema>,
  void,
  z.infer<typeof wmsOutboundShipmentInsertSchema>
>({
  mutationFn: (value) => createWmsOutboundShipment({ data: value }),
});

export const wmsOutboundShipmentUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsOutboundShipmentSchema>,
    void,
    z.infer<typeof wmsOutboundShipmentUpdateSchema>
  >({
    mutationFn: (value) => updateWmsOutboundShipment({ data: { id, value } }),
  });

export const wmsOutboundShipmentRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsOutboundShipment({ data: { id } }),
});