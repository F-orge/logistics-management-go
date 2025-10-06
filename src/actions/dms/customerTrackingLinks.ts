import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { DmsCustomerTrackingLinkRepository } from '@/repositories/dms/customerTrackingLinks';
import {
  dmsCustomerTrackingLinkInsertSchema,
  dmsCustomerTrackingLinkSchema,
  dmsCustomerTrackingLinkUpdateSchema,
} from '@/schemas/dms/customer_tracking_link';

export const selectDmsCustomerTrackingLink = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(dmsCustomerTrackingLinkSchema))
  .handler(async ({ data }) => {
    const repository = new DmsCustomerTrackingLinkRepository(kyselyDb);

    const result = await repository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<
          DB,
          'dms.customerTrackingLinks'
        >,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'dms.customerTrackingLinks', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return dmsCustomerTrackingLinkSchema.array().parseAsync(result);
  });

export const createDmsCustomerTrackingLink = createServerFn({
  method: 'POST',
})
  .inputValidator(dmsCustomerTrackingLinkInsertSchema)
  .handler(async ({ data }) => {
    const repository = new DmsCustomerTrackingLinkRepository(kyselyDb);

    const result = await repository.create(data).executeTakeFirst();

    return dmsCustomerTrackingLinkSchema.parseAsync(result);
  });

export const updateDmsCustomerTrackingLink = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: dmsCustomerTrackingLinkUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const repository = new DmsCustomerTrackingLinkRepository(kyselyDb);

    const result = await repository
      .update(data.id, data.value)
      .executeTakeFirst();

    return dmsCustomerTrackingLinkSchema.parseAsync(result);
  });

export const removeDmsCustomerTrackingLink = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const repository = new DmsCustomerTrackingLinkRepository(kyselyDb);

    const result = await repository.delete(data.id).executeTakeFirst();

    return result;
  });
