import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmCaseRepository } from '@/repositories/crm/cases';
import {
  crmCaseSchema,
  crmCaseInsertSchema,
  crmCaseUpdateSchema,
} from '@/schemas/crm/cases';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmCase = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmCaseSchema))
  .handler(async ({ data }) => {
    const repo = new CrmCaseRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.cases'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.cases', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmCaseSchema.array().parseAsync(result);
  });

export const createCrmCase = createServerFn({ method: 'POST' })
  .inputValidator(crmCaseInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmCaseRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmCaseSchema.parseAsync(result);
  });

export const updateCrmCase = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmCaseUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmCaseRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmCaseSchema.parseAsync(result);
  });

export const removeCrmCase = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmCaseRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM cases will follow the contacts.ts pattern.
