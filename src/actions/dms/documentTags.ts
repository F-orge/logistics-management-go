import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentTagRepository } from '@/repositories/dms/documentTags';
import {
  dmsDocumentTagSchema,
  dmsDocumentTagInsertSchema,
  dmsDocumentTagUpdateSchema,
} from '@/schemas/dms/document_tag';

export const selectDmsDocumentTag = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentTagSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documentTags'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documentTags', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentTagSchema.array().parseAsync(result);
  });

export const createDmsDocumentTag = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentTagInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentTagSchema.parseAsync(result);
  });

export const updateDmsDocumentTag = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentTagUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDocumentTagSchema.parseAsync(result);
  });

export const removeDmsDocumentTag = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentTagRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
