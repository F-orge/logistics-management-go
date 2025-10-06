import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingAccountingSyncLogRepository } from '@/repositories/billing/accountingSyncLogs';
import {
  billingAccountingSyncLogInsertSchema,
  billingAccountingSyncLogSchema,
  billingAccountingSyncLogUpdateSchema,
} from '@/schemas/billing/accounting_sync_log';

export const selectBillingAccountingSyncLog = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingAccountingSyncLogSchema))
  .handler(async ({ data }) => {
    const accountingSyncLogRepository = new BillingAccountingSyncLogRepository(kyselyDb);

    const result = await accountingSyncLogRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.accountingSyncLog'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.accountingSyncLog', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingAccountingSyncLogSchema.array().parseAsync(result);
  });

export const createBillingAccountingSyncLog = createServerFn({
  method: 'POST',
})
  .inputValidator(billingAccountingSyncLogInsertSchema)
  .handler(async ({ data }) => {
    const accountingSyncLogRepository = new BillingAccountingSyncLogRepository(kyselyDb);

    const result = await accountingSyncLogRepository.create(data).executeTakeFirst();

    return billingAccountingSyncLogSchema.parseAsync(result);
  });

export const updateBillingAccountingSyncLog = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingAccountingSyncLogUpdateSchema }))
  .handler(async ({ data }) => {
    const accountingSyncLogRepository = new BillingAccountingSyncLogRepository(kyselyDb);

    const result = await accountingSyncLogRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingAccountingSyncLogSchema.parseAsync(result);
  });

export const removeBillingAccountingSyncLog = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const accountingSyncLogRepository = new BillingAccountingSyncLogRepository(kyselyDb);

    const result = await accountingSyncLogRepository.delete(data.id).executeTakeFirst();

    return result;
  });
