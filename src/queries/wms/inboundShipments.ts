import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createWmsInboundShipment,
  removeWmsInboundShipment,
  selectWmsInboundShipments,
  updateWmsInboundShipment,
} from '@/actions/wms/inboundShipments';
import {
  wmsInboundShipmentInsertSchema,
  wmsInboundShipmentSchema,
  wmsInboundShipmentUpdateSchema,
} from '@/schemas/wms/inbound_shipment';

export const wmsInboundShipmentQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['wms.inboundShipments', page, perPage],
    queryFn: () =>
      selectWmsInboundShipments({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const wmsInboundShipmentCreateMutationOption = mutationOptions<
  z.infer<typeof wmsInboundShipmentSchema>,
  void,
  z.infer<typeof wmsInboundShipmentInsertSchema>
>({
  mutationFn: (value) => createWmsInboundShipment({ data: value }),
});

export const wmsInboundShipmentUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof wmsInboundShipmentSchema>,
    void,
    z.infer<typeof wmsInboundShipmentUpdateSchema>
  >({
    mutationFn: (value) => updateWmsInboundShipment({ data: { id, value } }),
  });

export const wmsInboundShipmentRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeWmsInboundShipment({ data: { id } }),
});
