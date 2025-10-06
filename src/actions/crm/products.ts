import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmProductRepository } from '@/repositories/crm/products';
import {
  crmProductSchema,
  crmProductInsertSchema,
  crmProductUpdateSchema,
} from '@/schemas/crm/products';
import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';

export const selectCrmProduct = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmProductSchema))
  .handler(async ({ data }) => {
    const repo = new CrmProductRepository(kyselyDb);
    const result = await repo
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.products'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.products', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmProductSchema.array().parseAsync(result);
  });

export const createCrmProduct = createServerFn({ method: 'POST' })
  .inputValidator(crmProductInsertSchema)
  .handler(async ({ data }) => {
    const repo = new CrmProductRepository(kyselyDb);
    const result = await repo.create(data).executeTakeFirst();
    return crmProductSchema.parseAsync(result);
  });

export const updateCrmProduct = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid(), value: crmProductUpdateSchema }))
  .handler(async ({ data }) => {
    const repo = new CrmProductRepository(kyselyDb);
    const result = await repo.update(data.id, data.value).executeTakeFirst();
    return crmProductSchema.parseAsync(result);
  });

export const removeCrmProduct = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repo = new CrmProductRepository(kyselyDb);
    const result = await repo.delete(data.id).executeTakeFirst();
    return result;
  });
// Server actions for CRM products will follow the contacts.ts pattern.
