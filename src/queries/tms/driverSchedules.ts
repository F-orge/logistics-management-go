import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsDriverSchedule,
  removeTmsDriverSchedule,
  selectTmsDriverSchedule,
  updateTmsDriverSchedule,
} from '@/actions/tms/driverSchedules';
import {
  tmsDriverScheduleInsertSchema,
  tmsDriverScheduleSchema,
  tmsDriverScheduleUpdateSchema,
} from '@/schemas/tms/driver_schedule';

export const tmsDriverScheduleQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.driverSchedules', page, perPage],
    queryFn: () =>
      selectTmsDriverSchedule({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsDriverScheduleCreateMutationOption = mutationOptions<
  z.infer<typeof tmsDriverScheduleSchema>,
  void,
  z.infer<typeof tmsDriverScheduleInsertSchema>
>({
  mutationFn: (value) => createTmsDriverSchedule({ data: value }),
});

export const tmsDriverScheduleUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsDriverScheduleSchema>,
    void,
    z.infer<typeof tmsDriverScheduleUpdateSchema>
  >({
    mutationFn: (value) => updateTmsDriverSchedule({ data: { id, value } }),
  });

export const tmsDriverScheduleRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsDriverSchedule({ data: { id } }),
});