import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentRepository } from '@/repositories/dms/documents';
import {
  dmsDocumentSchema,
  dmsDocumentInsertSchema,
  dmsDocumentUpdateSchema,
} from '@/schemas/dms/document';

export const selectDmsDocument = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documents'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documents', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentSchema.array().parseAsync(result);
  });

export const createDmsDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentSchema.parseAsync(result);
  });

export const updateDmsDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDocumentSchema.parseAsync(result);
  });

export const removeDmsDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
