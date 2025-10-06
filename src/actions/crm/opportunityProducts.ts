import { kyselyDb } from '@/db';
import {
  insertOpportunityProductSchema,
  updateOpportunityProductSchema,
} from '@/db/schemas';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmOpportunityProductRepository } from '@/repositories/crm/opportunityProducts';
import {
  crmOpportunityProductSchema,
  crmOpportunityProductInsertSchema,
  crmOpportunityProductUpdateSchema,
} from '@/schemas/crm/opportunity_products';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmOpportunityProduct = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmOpportunityProductSchema))
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityProductRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'crm.opportunityProducts'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.opportunityProducts', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmOpportunityProductSchema.array().parseAsync(result);
  });

export const createCrmOpportunityProduct = createServerFn({ method: 'POST' })
  .inputValidator(crmOpportunityProductInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityProductRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmOpportunityProductSchema.parseAsync(result);
  });

export const updateCrmOpportunityProduct = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({ id: z.uuid(), value: crmOpportunityProductUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityProductRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmOpportunityProductSchema.parseAsync(result);
  });

export const removeCrmOpportunityProduct = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityProductRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM opportunity products will follow the contacts.ts pattern.
