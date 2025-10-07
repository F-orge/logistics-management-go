import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsVehicle,
  removeTmsVehicle,
  selectTmsVehicle,
  updateTmsVehicle,
} from '@/actions/tms/vehicles';
import {
  tmsVehicleInsertSchema,
  tmsVehicleSchema,
  tmsVehicleUpdateSchema,
} from '@/schemas/tms/vehicle';

export const tmsVehicleQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.vehicles', page, perPage],
    queryFn: () =>
      selectTmsVehicle({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsVehicleCreateMutationOption = mutationOptions<
  z.infer<typeof tmsVehicleSchema>,
  void,
  z.infer<typeof tmsVehicleInsertSchema>
>({
  mutationFn: (value) => createTmsVehicle({ data: value }),
});

export const tmsVehicleUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsVehicleSchema>,
    void,
    z.infer<typeof tmsVehicleUpdateSchema>
  >({
    mutationFn: (value) => updateTmsVehicle({ data: { id, value } }),
  });

export const tmsVehicleRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsVehicle({ data: { id } }),
});