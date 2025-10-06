import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingDisputeRepository } from '@/repositories/billing/disputes';
import {
  billingDisputeInsertSchema,
  billingDisputeSchema,
  billingDisputeUpdateSchema,
} from '@/schemas/billing/dispute';

export const selectBillingDispute = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingDisputeSchema))
  .handler(async ({ data }) => {
    const disputeRepository = new BillingDisputeRepository(kyselyDb);

    const result = await disputeRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.disputes'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.disputes', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingDisputeSchema.array().parseAsync(result);
  });

export const createBillingDispute = createServerFn({
  method: 'POST',
})
  .inputValidator(billingDisputeInsertSchema)
  .handler(async ({ data }) => {
    const disputeRepository = new BillingDisputeRepository(kyselyDb);

    const result = await disputeRepository.create(data).executeTakeFirst();

    return billingDisputeSchema.parseAsync(result);
  });

export const updateBillingDispute = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingDisputeUpdateSchema }))
  .handler(async ({ data }) => {
    const disputeRepository = new BillingDisputeRepository(kyselyDb);

    const result = await disputeRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingDisputeSchema.parseAsync(result);
  });

export const removeBillingDispute = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const disputeRepository = new BillingDisputeRepository(kyselyDb);

    const result = await disputeRepository.delete(data.id).executeTakeFirst();

    return result;
  });
