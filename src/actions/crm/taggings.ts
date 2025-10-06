import { kyselyDb } from '@/db';
import { insertTaggingSchema, updateTaggingSchema } from '@/db/schemas';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmTaggingRepository } from '@/repositories/crm/taggings';
import {
  crmTaggingSchema,
  crmTaggingInsertSchema,
  crmTaggingUpdateSchema,
} from '@/schemas/crm/tagging';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmTagging = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmTaggingSchema))
  .handler(async ({ data }) => {
    const repo = new CrmTaggingRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.taggings'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.taggings', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmTaggingSchema.array().parseAsync(result);
  });

export const createCrmTagging = createServerFn({ method: 'POST' })
  .inputValidator(crmTaggingInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmTaggingRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmTaggingSchema.parseAsync(result);
  });

export const updateCrmTagging = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmTaggingUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmTaggingRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmTaggingSchema.parseAsync(result);
  });

export const removeCrmTagging = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmTaggingRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM taggings will follow the contacts.ts pattern.
