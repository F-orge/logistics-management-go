import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { BillingCreditNoteRepository } from '@/repositories/billing/creditNotes';
import {
  billingCreditNoteInsertSchema,
  billingCreditNoteSchema,
  billingCreditNoteUpdateSchema,
} from '@/schemas/billing/credit_note';

export const selectBillingCreditNote = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(billingCreditNoteSchema))
  .handler(async ({ data }) => {
    const creditNoteRepository = new BillingCreditNoteRepository(kyselyDb);

    const result = await creditNoteRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'billing.creditNotes'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'billing.creditNotes', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return billingCreditNoteSchema.array().parseAsync(result);
  });

export const createBillingCreditNote = createServerFn({
  method: 'POST',
})
  .inputValidator(billingCreditNoteInsertSchema)
  .handler(async ({ data }) => {
    const creditNoteRepository = new BillingCreditNoteRepository(kyselyDb);

    const result = await creditNoteRepository.create(data).executeTakeFirst();

    return billingCreditNoteSchema.parseAsync(result);
  });

export const updateBillingCreditNote = createServerFn({
  method: 'POST',
})
  .inputValidator(
    z.object({ id: z.uuid(), value: billingCreditNoteUpdateSchema }),
  )
  .handler(async ({ data }) => {
    const creditNoteRepository = new BillingCreditNoteRepository(kyselyDb);

    const result = await creditNoteRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return billingCreditNoteSchema.parseAsync(result);
  });

export const removeBillingCreditNote = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const creditNoteRepository = new BillingCreditNoteRepository(kyselyDb);

    const result = await creditNoteRepository
      .delete(data.id)
      .executeTakeFirst();

    return result;
  });
