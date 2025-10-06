import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingPaymentRepository } from '@/repositories/billing/payments';
import {
  billingPaymentInsertSchema,
  billingPaymentSchema,
  billingPaymentUpdateSchema,
} from '@/schemas/billing/payment';

export const selectBillingPayment = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingPaymentSchema))
  .handler(async ({ data }) => {
    const paymentRepository = new BillingPaymentRepository(kyselyDb);

    const result = await paymentRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.payments'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.payments', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingPaymentSchema.array().parseAsync(result);
  });

export const createBillingPayment = createServerFn({
  method: 'POST',
})
  .inputValidator(billingPaymentInsertSchema)
  .handler(async ({ data }) => {
    const paymentRepository = new BillingPaymentRepository(kyselyDb);

    const result = await paymentRepository.create(data).executeTakeFirst();

    return billingPaymentSchema.parseAsync(result);
  });

export const updateBillingPayment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: billingPaymentUpdateSchema }))
  .handler(async ({ data }) => {
    const paymentRepository = new BillingPaymentRepository(kyselyDb);

    const result = await paymentRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingPaymentSchema.parseAsync(result);
  });

export const removeBillingPayment = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const paymentRepository = new BillingPaymentRepository(kyselyDb);

    const result = await paymentRepository.delete(data.id).executeTakeFirst();

    return result;
  });
