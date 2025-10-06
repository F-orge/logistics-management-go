import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentLinkRepository } from '@/repositories/dms/documentLinks';
import {
  dmsDocumentLinkSchema,
  dmsDocumentLinkInsertSchema,
  dmsDocumentLinkUpdateSchema,
} from '@/schemas/dms/document_link';

export const selectDmsDocumentLink = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentLinkSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentLinkRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documentLinks'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documentLinks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentLinkSchema.array().parseAsync(result);
  });

export const createDmsDocumentLink = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentLinkInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentLinkRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentLinkSchema.parseAsync(result);
  });

export const updateDmsDocumentLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentLinkUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentLinkRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDocumentLinkSchema.parseAsync(result);
  });

export const removeDmsDocumentLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentLinkRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
