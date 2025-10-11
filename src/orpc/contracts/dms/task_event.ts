import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  dmsTaskEventInsertSchema,
  dmsTaskEventSchema,
  dmsTaskEventUpdateSchema,
} from '@/schemas/dms/task_event';

export const paginateTaskEventContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(dmsTaskEventSchema),
        sort: sortTransformer(dmsTaskEventSchema),
      }),
    ),
  )
  .output(z.array(dmsTaskEventSchema));

export const rangeTaskEventContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(dmsTaskEventSchema),
        sort: sortTransformer(dmsTaskEventSchema),
      }),
    ),
  )
  .output(z.array(dmsTaskEventSchema));

export const inTaskEventContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(dmsTaskEventSchema));

export const createTaskEventContract = oc
  .input(dmsTaskEventInsertSchema)
  .output(dmsTaskEventSchema);

export const updateTaskEventContract = oc
  .input(z.object({ id: z.uuid(), value: dmsTaskEventUpdateSchema }))
  .output(dmsTaskEventSchema);

export const deleteTaskEventContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
