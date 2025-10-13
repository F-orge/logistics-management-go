import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingCreditNoteInsertSchema,
  billingCreditNoteSchema,
  billingCreditNoteUpdateSchema,
} from '@/schemas/billing/credit_note';

export const paginateCreditNoteContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingCreditNoteSchema),
        sort: sortTransformer(billingCreditNoteSchema),
      }),
    ),
  )
  .output(z.array(billingCreditNoteSchema));

export const rangeCreditNoteContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingCreditNoteSchema),
        sort: sortTransformer(billingCreditNoteSchema),
      }),
    ),
  )
  .output(z.array(billingCreditNoteSchema));

export const inCreditNoteContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingCreditNoteSchema));

export const createCreditNoteContract = oc
  .input(billingCreditNoteInsertSchema)
  .output(billingCreditNoteSchema);

export const updateCreditNoteContract = oc
  .input(z.object({ id: z.uuid(), value: billingCreditNoteUpdateSchema }))
  .output(billingCreditNoteSchema);

export const deleteCreditNoteContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
