import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingQuoteRepository } from '@/repositories/billing/quotes';
import {
  billingQuoteInsertSchema,
  billingQuoteSchema,
  billingQuoteUpdateSchema,
} from '@/schemas/billing/quote';

export const selectBillingQuote = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingQuoteSchema))
  .handler(async ({ data }) => {
    const quoteRepository = new BillingQuoteRepository(kyselyDb);

    const result = await quoteRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.quotes'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.quotes', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingQuoteSchema.array().parseAsync(result);
  });

export const createBillingQuote = createServerFn({
  method: 'POST',
})
  .inputValidator(billingQuoteInsertSchema)
  .handler(async ({ data }) => {
    const quoteRepository = new BillingQuoteRepository(kyselyDb);

    const result = await quoteRepository.create(data).executeTakeFirst();

    return billingQuoteSchema.parseAsync(result);
  });

export const updateBillingQuote = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingQuoteUpdateSchema }))
  .handler(async ({ data }) => {
    const quoteRepository = new BillingQuoteRepository(kyselyDb);

    const result = await quoteRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingQuoteSchema.parseAsync(result);
  });

export const removeBillingQuote = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const quoteRepository = new BillingQuoteRepository(kyselyDb);

    const result = await quoteRepository.delete(data.id).executeTakeFirst();

    return result;
  });
