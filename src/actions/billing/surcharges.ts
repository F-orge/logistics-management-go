import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingSurchargeRepository } from '@/repositories/billing/surcharges';
import {
  billingSurchargeInsertSchema,
  billingSurchargeSchema,
  billingSurchargeUpdateSchema,
} from '@/schemas/billing/surcharge';

export const selectBillingSurcharge = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingSurchargeSchema))
  .handler(async ({ data }) => {
    const surchargeRepository = new BillingSurchargeRepository(kyselyDb);

    const result = await surchargeRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.surcharges'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.surcharges', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingSurchargeSchema.array().parseAsync(result);
  });

export const createBillingSurcharge = createServerFn({
  method: 'POST',
})
  .inputValidator(billingSurchargeInsertSchema)
  .handler(async ({ data }) => {
    const surchargeRepository = new BillingSurchargeRepository(kyselyDb);

    const result = await surchargeRepository.create(data).executeTakeFirst();

    return billingSurchargeSchema.parseAsync(result);
  });

export const updateBillingSurcharge = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingSurchargeUpdateSchema }))
  .handler(async ({ data }) => {
    const surchargeRepository = new BillingSurchargeRepository(kyselyDb);

    const result = await surchargeRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingSurchargeSchema.parseAsync(result);
  });

export const removeBillingSurcharge = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const surchargeRepository = new BillingSurchargeRepository(kyselyDb);

    const result = await surchargeRepository.delete(data.id).executeTakeFirst();

    return result;
  });
