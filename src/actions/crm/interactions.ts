import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmInteractionRepository } from '@/repositories/crm/interactions';
import {
  crmInteractionSchema,
  crmInteractionInsertSchema,
  crmInteractionUpdateSchema,
} from '@/schemas/crm/interactions';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmInteraction = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmInteractionSchema))
  .handler(async ({ data }) => {
    const repo = new CrmInteractionRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.interactions'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.interactions', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmInteractionSchema.array().parseAsync(result);
  });

export const createCrmInteraction = createServerFn({ method: 'POST' })
  .inputValidator(crmInteractionInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmInteractionRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmInteractionSchema.parseAsync(result);
  });

export const updateCrmInteraction = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmInteractionUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmInteractionRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmInteractionSchema.parseAsync(result);
  });

export const removeCrmInteraction = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmInteractionRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
