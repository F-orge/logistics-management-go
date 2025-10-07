import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  createTmsShipmentLeg,
  removeTmsShipmentLeg,
  selectTmsShipmentLeg,
  updateTmsShipmentLeg,
} from '@/actions/tms/shipmentLegs';
import {
  tmsShipmentLegInsertSchema,
  tmsShipmentLegSchema,
  tmsShipmentLegUpdateSchema,
} from '@/schemas/tms/shipment_leg';

export const tmsShipmentLegQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.shipmentLegs', page, perPage],
    queryFn: () =>
      selectTmsShipmentLeg({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsShipmentLegCreateMutationOption = mutationOptions<
  z.infer<typeof tmsShipmentLegSchema>,
  void,
  z.infer<typeof tmsShipmentLegInsertSchema>
>({
  mutationFn: (value) => createTmsShipmentLeg({ data: value }),
});

export const tmsShipmentLegUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsShipmentLegSchema>,
    void,
    z.infer<typeof tmsShipmentLegUpdateSchema>
  >({
    mutationFn: (value) => updateTmsShipmentLeg({ data: { id, value } }),
  });

export const tmsShipmentLegRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsShipmentLeg({ data: { id } }),
});
