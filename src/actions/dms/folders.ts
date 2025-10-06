import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsFolderRepository } from '@/repositories/dms/folders';
import {
  dmsFolderSchema,
  dmsFolderInsertSchema,
  dmsFolderUpdateSchema,
} from '@/schemas/dms/folder';

export const selectDmsFolder = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsFolderSchema))
  .handler(async ({ data }) => {
    const repository = new DmsFolderRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.folders'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.folders', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsFolderSchema.array().parseAsync(result);
  });

export const createDmsFolder = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsFolderInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsFolderRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsFolderSchema.parseAsync(result);
  });

export const updateDmsFolder = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsFolderUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsFolderRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsFolderSchema.parseAsync(result);
  });

export const removeDmsFolder = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsFolderRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
