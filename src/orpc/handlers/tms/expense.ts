import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/expense';
import { ExpenseRepository } from '@/repositories/tms/expenses';
import { HonoVariables } from '@/server';

export const paginateExpense = implement(tmsContracts.paginateExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeExpense = implement(tmsContracts.rangeExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inExpense = implement(tmsContracts.inExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo.in(input).execute();
  });

export const createExpense = implement(tmsContracts.createExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateExpense = implement(tmsContracts.updateExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteExpense = implement(tmsContracts.deleteExpenseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ExpenseRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
