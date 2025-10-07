import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsShipmentLegEvent,
  removeTmsShipmentLegEvent,
  selectTmsShipmentLegEvent,
  updateTmsShipmentLegEvent,
} from '@/actions/tms/shipmentLegEvents';
import {
  tmsShipmentLegEventInsertSchema,
  tmsShipmentLegEventSchema,
  tmsShipmentLegEventUpdateSchema,
} from '@/schemas/tms/shipment_leg_event';

export const tmsShipmentLegEventQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.shipmentLegEvents', page, perPage],
    queryFn: () =>
      selectTmsShipmentLegEvent({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsShipmentLegEventCreateMutationOption = mutationOptions<
  z.infer<typeof tmsShipmentLegEventSchema>,
  void,
  z.infer<typeof tmsShipmentLegEventInsertSchema>
>({
  mutationFn: (value) => createTmsShipmentLegEvent({ data: value }),
});

export const tmsShipmentLegEventUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsShipmentLegEventSchema>,
    void,
    z.infer<typeof tmsShipmentLegEventUpdateSchema>
  >({
    mutationFn: (value) => updateTmsShipmentLegEvent({ data: { id, value } }),
  });

export const tmsShipmentLegEventRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsShipmentLegEvent({ data: { id } }),
});
