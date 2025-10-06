import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsDocumentAccessLogRepository } from '@/repositories/dms/documentAccessLogs';
import {
  dmsDocumentAccessLogSchema,
  dmsDocumentAccessLogInsertSchema,
  dmsDocumentAccessLogUpdateSchema,
} from '@/schemas/dms/document_access_log';

export const selectDmsDocumentAccessLog = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsDocumentAccessLogSchema))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentAccessLogRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'dms.documentAccessLogs'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.documentAccessLogs', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsDocumentAccessLogSchema.array().parseAsync(result);
  });

export const createDmsDocumentAccessLog = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsDocumentAccessLogInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsDocumentAccessLogRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsDocumentAccessLogSchema.parseAsync(result);
  });

export const updateDmsDocumentAccessLog = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: dmsDocumentAccessLogUpdateSchema }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentAccessLogRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsDocumentAccessLogSchema.parseAsync(result);
  });

export const removeDmsDocumentAccessLog = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsDocumentAccessLogRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
