import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingAccountTransactionRepository } from '@/repositories/billing/accountTransactions';
import {
  billingAccountTransactionInsertSchema,
  billingAccountTransactionSchema,
  billingAccountTransactionUpdateSchema,
} from '@/schemas/billing/account_transaction';

export const selectBillingAccountTransaction = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingAccountTransactionSchema))
  .handler(async ({ data }) => {
    const accountTransactionRepository =
      new BillingAccountTransactionRepository(kyselyDb);

    const result = await accountTransactionRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'billing.accountTransactions'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.accountTransactions', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingAccountTransactionSchema.array().parseAsync(result);
  });

export const createBillingAccountTransaction = createServerFn({
  method: 'POST',
})
  .inputValidator(billingAccountTransactionInsertSchema)
  .handler(async ({ data }) => {
    const accountTransactionRepository =
      new BillingAccountTransactionRepository(kyselyDb);

    const result = await accountTransactionRepository
      .create(data)
      .executeTakeFirst();

    return billingAccountTransactionSchema.parseAsync(result);
  });

export const updateBillingAccountTransaction = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: billingAccountTransactionUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const accountTransactionRepository =
      new BillingAccountTransactionRepository(kyselyDb);

    const result = await accountTransactionRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingAccountTransactionSchema.parseAsync(result);
  });

export const removeBillingAccountTransaction = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const accountTransactionRepository =
      new BillingAccountTransactionRepository(kyselyDb);

    const result = await accountTransactionRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
