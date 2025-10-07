import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createTmsExpense,
  removeTmsExpense,
  selectTmsExpense,
  updateTmsExpense,
} from '@/actions/tms/expenses';
import {
  tmsExpenseInsertSchema,
  tmsExpenseSchema,
  tmsExpenseUpdateSchema,
} from '@/schemas/tms/expense';

export const tmsExpenseQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['tms.expenses', page, perPage],
    queryFn: () =>
      selectTmsExpense({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const tmsExpenseCreateMutationOption = mutationOptions<
  z.infer<typeof tmsExpenseSchema>,
  void,
  z.infer<typeof tmsExpenseInsertSchema>
>({
  mutationFn: (value) => createTmsExpense({ data: value }),
});

export const tmsExpenseUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof tmsExpenseSchema>,
    void,
    z.infer<typeof tmsExpenseUpdateSchema>
  >({
    mutationFn: (value) => updateTmsExpense({ data: { id, value } }),
  });

export const tmsExpenseRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeTmsExpense({ data: { id } }),
});