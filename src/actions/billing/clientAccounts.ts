import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingClientAccountRepository } from '@/repositories/billing/clientAccounts';
import {
  billingClientAccountInsertSchema,
  billingClientAccountSchema,
  billingClientAccountUpdateSchema,
} from '@/schemas/billing/client_account';

export const selectBillingClientAccount = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingClientAccountSchema))
  .handler(async ({ data }) => {
    const clientAccountRepository = new BillingClientAccountRepository(kyselyDb);

    const result = await clientAccountRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.clientAccounts'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.clientAccounts', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingClientAccountSchema.array().parseAsync(result);
  });

export const createBillingClientAccount = createServerFn({
  method: 'POST',
})
  .inputValidator(billingClientAccountInsertSchema)
  .handler(async ({ data }) => {
    const clientAccountRepository = new BillingClientAccountRepository(kyselyDb);

    const result = await clientAccountRepository.create(data).executeTakeFirst();

    return billingClientAccountSchema.parseAsync(result);
  });

export const updateBillingClientAccount = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingClientAccountUpdateSchema }))
  .handler(async ({ data }) => {
    const clientAccountRepository = new BillingClientAccountRepository(kyselyDb);

    const result = await clientAccountRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingClientAccountSchema.parseAsync(result);
  });

export const removeBillingClientAccount = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const clientAccountRepository = new BillingClientAccountRepository(kyselyDb);

    const result = await clientAccountRepository.delete(data.id).executeTakeFirst();

    return result;
  });
