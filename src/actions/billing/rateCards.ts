import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingRateCardRepository } from '@/repositories/billing/rateCards';
import {
  billingRateCardInsertSchema,
  billingRateCardSchema,
  billingRateCardUpdateSchema,
} from '@/schemas/billing/rate_card';

export const selectBillingRateCard = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingRateCardSchema))
  .handler(async ({ data }) => {
    const rateCardRepository = new BillingRateCardRepository(kyselyDb);

    const result = await rateCardRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.rateCards'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.rateCards', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingRateCardSchema.array().parseAsync(result);
  });

export const createBillingRateCard = createServerFn({
  method: 'POST',
})
  .inputValidator(billingRateCardInsertSchema)
  .handler(async ({ data }) => {
    const rateCardRepository = new BillingRateCardRepository(kyselyDb);

    const result = await rateCardRepository.create(data).executeTakeFirst();

    return billingRateCardSchema.parseAsync(result);
  });

export const updateBillingRateCard = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: billingRateCardUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const rateCardRepository = new BillingRateCardRepository(kyselyDb);

    const result = await rateCardRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingRateCardSchema.parseAsync(result);
  });

export const removeBillingRateCard = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const rateCardRepository = new BillingRateCardRepository(kyselyDb);

    const result = await rateCardRepository.delete(data.id).executeTakeFirst();

    return result;
  });
