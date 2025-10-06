import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentCategoryRepository } from '@/repositories/dms/documentCategories';
import {
  dmsDocumentCategorySchema,
  dmsDocumentCategoryInsertSchema,
  dmsDocumentCategoryUpdateSchema,
} from '@/schemas/dms/document_category';

export const selectDmsDocumentCategory = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentCategorySchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentCategoryRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documentCategories'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documentCategories', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentCategorySchema.array().parseAsync(result);
  });

export const createDmsDocumentCategory = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentCategoryInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentCategoryRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentCategorySchema.parseAsync(result);
  });

export const updateDmsDocumentCategory = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentCategoryUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentCategoryRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDocumentCategorySchema.parseAsync(result);
  });

export const removeDmsDocumentCategory = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentCategoryRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
