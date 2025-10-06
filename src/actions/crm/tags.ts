import { kyselyDb } from '@/db';
import { insertTagSchema, updateTagSchema } from '@/db/schemas';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmTagRepository } from '@/repositories/crm/tags';
import { crmTagSchema } from '@/schemas/crm/tags';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmTag = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmTagSchema))
  .handler(async ({ data }) => {
    const repo = new CrmTagRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.tags'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.tags', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmTagSchema.array().parseAsync(result);
  });

export const createCrmTag = createServerFn({ method: 'POST' })
  .inputValidator(insertTagSchema)
  .handler(async ({ data }) => {
    const repo = new CrmTagRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmTagSchema.parseAsync(result);
  });

export const updateCrmTag = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: updateTagSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmTagRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmTagSchema.parseAsync(result);
  });

export const removeCrmTag = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmTagRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM tags will follow the contacts.ts pattern.
