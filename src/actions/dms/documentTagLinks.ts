import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentTagLinkRepository } from '@/repositories/dms/documentTagLinks';
import {
  dmsDocumentTagLinkSchema,
  dmsDocumentTagLinkInsertSchema,
  dmsDocumentTagLinkUpdateSchema,
} from '@/schemas/dms/document_tag_link';

export const selectDmsDocumentTagLink = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentTagLinkSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagLinkRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documentTagLinks'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documentTagLinks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentTagLinkSchema.array().parseAsync(result);
  });

export const createDmsDocumentTagLink = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentTagLinkInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagLinkRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentTagLinkSchema.parseAsync(result);
  });

export const updateDmsDocumentTagLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentTagLinkUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagLinkRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)!
      .executeTakeFirst();

    return dmsDocumentTagLinkSchema.parseAsync(result);
  });

export const removeDmsDocumentTagLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagLinkRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
