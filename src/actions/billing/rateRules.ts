import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingRateRuleRepository } from '@/repositories/billing/rateRules';
import {
  billingRateRuleInsertSchema,
  billingRateRuleSchema,
  billingRateRuleUpdateSchema,
} from '@/schemas/billing/rate_rule';

export const selectBillingRateRule = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingRateRuleSchema))
  .handler(async ({ data }) => {
    const rateRuleRepository = new BillingRateRuleRepository(kyselyDb);

    const result = await rateRuleRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.rateRules'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.rateRules', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingRateRuleSchema.array().parseAsync(result);
  });

export const createBillingRateRule = createServerFn({
  method: 'POST',
})
  .inputValidator(billingRateRuleInsertSchema)
  .handler(async ({ data }) => {
    const rateRuleRepository = new BillingRateRuleRepository(kyselyDb);

    const result = await rateRuleRepository.create(data).executeTakeFirst();

    return billingRateRuleSchema.parseAsync(result);
  });

export const updateBillingRateRule = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingRateRuleUpdateSchema }))
  .handler(async ({ data }) => {
    const rateRuleRepository = new BillingRateRuleRepository(kyselyDb);

    const result = await rateRuleRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingRateRuleSchema.parseAsync(result);
  });

export const removeBillingRateRule = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const rateRuleRepository = new BillingRateRuleRepository(kyselyDb);

    const result = await rateRuleRepository.delete(data.id).executeTakeFirst();

    return result;
  });
