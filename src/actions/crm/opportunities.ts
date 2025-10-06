import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmOpportunityRepository } from '@/repositories/crm/opportunities';
import {
  crmOpportunitySchema,
  crmOpportunityInsertSchema,
  crmOpportunityUpdateSchema,
} from '@/schemas/crm/opportunities';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmOpportunity = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmOpportunitySchema))
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.opportunities'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.opportunities', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmOpportunitySchema.array().parseAsync(result);
  });

export const createCrmOpportunity = createServerFn({ method: 'POST' })
  .inputValidator(crmOpportunityInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmOpportunitySchema.parseAsync(result);
  });

export const updateCrmOpportunity = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmOpportunityUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmOpportunitySchema.parseAsync(result);
  });

export const removeCrmOpportunity = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmOpportunityRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM opportunities will follow the contacts.ts pattern.
