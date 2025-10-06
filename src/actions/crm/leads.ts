import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmLeadRepository } from '@/repositories/crm/leads';
import {
  crmLeadSchema,
  crmLeadInsertSchema,
  crmLeadUpdateSchema,
} from '@/schemas/crm/leads';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmLead = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmLeadSchema))
  .handler(async ({ data }) => {
    const repo = new CrmLeadRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.leads'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.leads', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmLeadSchema.array().parseAsync(result);
  });

export const createCrmLead = createServerFn({ method: 'POST' })
  .inputValidator(crmLeadInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmLeadRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmLeadSchema.parseAsync(result);
  });

export const updateCrmLead = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmLeadUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmLeadRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmLeadSchema.parseAsync(result);
  });

export const removeCrmLead = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmLeadRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM leads will follow the contacts.ts pattern.
