import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { TmsExpenseRepository } from '@/repositories/tms/expenses';
import {
  tmsExpenseInsertSchema,
  tmsExpenseSchema,
  tmsExpenseUpdateSchema,
} from '@/schemas/tms/expense';

export const selectTmsExpense = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(tmsExpenseSchema))
  .handler(async ({ data }) => {
    const repo = new TmsExpenseRepository(kyselyDb);

    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'tms.expenses'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'tms.expenses', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return tmsExpenseSchema.array().parseAsync(result);
  });

export const createTmsExpense = createServerFn({ method: 'POST' })
  .inputValidator(tmsExpenseInsertSchema)
  .handler(async ({ data }) => {
    const repo = new TmsExpenseRepository(kyselyDb);

    const result = await repo.create(data).executeTakeFirst();

    return tmsExpenseSchema.parseAsync(result);
  });

export const updateTmsExpense = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: tmsExpenseUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new TmsExpenseRepository(kyselyDb);

    const result = await repo.update(data.id, data.value).executeTakeFirst();

    return tmsExpenseSchema.parseAsync(result);
  });

export const removeTmsExpense = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new TmsExpenseRepository(kyselyDb);

    const result = await repo.delete(data.id).executeTakeFirst();

    return result;
  });
