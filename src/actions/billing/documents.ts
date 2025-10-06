import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingDocumentRepository } from '@/repositories/billing/documents';
import {
  billingDocumentInsertSchema,
  billingDocumentSchema,
  billingDocumentUpdateSchema,
} from '@/schemas/billing/document';

export const selectBillingDocument = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingDocumentSchema))
  .handler(async ({ data }) => {
    const documentRepository = new BillingDocumentRepository(kyselyDb);

    const result = await documentRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.documents'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.documents', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingDocumentSchema.array().parseAsync(result);
  });

export const createBillingDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(billingDocumentInsertSchema)
  .handler(async ({ data }) => {
    const documentRepository = new BillingDocumentRepository(kyselyDb);

    const result = await documentRepository.create(data).executeTakeFirst();

    return billingDocumentSchema.parseAsync(result);
  });

export const updateBillingDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingDocumentUpdateSchema }))
  .handler(async ({ data }) => {
    const documentRepository = new BillingDocumentRepository(kyselyDb);

    const result = await documentRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingDocumentSchema.parseAsync(result);
  });

export const removeBillingDocument = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const documentRepository = new BillingDocumentRepository(kyselyDb);

    const result = await documentRepository.delete(data.id).executeTakeFirst();

    return result;
  });
