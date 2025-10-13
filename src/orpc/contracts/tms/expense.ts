import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsExpenseInsertSchema,
  tmsExpenseSchema,
  tmsExpenseUpdateSchema,
} from '@/schemas/tms/expense';

export const paginateExpenseContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsExpenseSchema),
        sort: sortTransformer(tmsExpenseSchema),
      }),
    ),
  )
  .output(z.array(tmsExpenseSchema));

export const rangeExpenseContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsExpenseSchema),
        sort: sortTransformer(tmsExpenseSchema),
      }),
    ),
  )
  .output(z.array(tmsExpenseSchema));

export const inExpenseContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsExpenseSchema));

export const createExpenseContract = oc
  .input(tmsExpenseInsertSchema)
  .output(tmsExpenseSchema);

export const updateExpenseContract = oc
  .input(z.object({ id: z.uuid(), value: tmsExpenseUpdateSchema }))
  .output(tmsExpenseSchema);

export const deleteExpenseContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
