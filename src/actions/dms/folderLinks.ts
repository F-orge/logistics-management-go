import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsFolderLinkRepository } from '@/repositories/dms/folderLinks';
import {
  dmsFolderLinkSchema,
  dmsFolderLinkInsertSchema,
  dmsFolderLinkUpdateSchema,
} from '@/schemas/dms/folder_link';

export const selectDmsFolderLink = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsFolderLinkSchema))
  .handler(async ({ data }) => {
    const repository = new DmsFolderLinkRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.folderLinks'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.folderLinks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsFolderLinkSchema.array().parseAsync(result);
  });

export const createDmsFolderLink = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsFolderLinkInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsFolderLinkRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsFolderLinkSchema.parseAsync(result);
  });

export const updateDmsFolderLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsFolderLinkUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsFolderLinkRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsFolderLinkSchema.parseAsync(result);
  });

export const removeDmsFolderLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsFolderLinkRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
