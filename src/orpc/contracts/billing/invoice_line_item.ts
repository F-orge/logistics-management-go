import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  billingInvoiceLineItemInsertSchema,
  billingInvoiceLineItemSchema,
  billingInvoiceLineItemUpdateSchema,
} from '@/schemas/billing/invoice_line_item';

export const paginateInvoiceLineItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingInvoiceLineItemSchema),
        sort: sortTransformer(billingInvoiceLineItemSchema),
      }),
    ),
  )
  .output(z.array(billingInvoiceLineItemSchema));

export const rangeInvoiceLineItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingInvoiceLineItemSchema),
        sort: sortTransformer(billingInvoiceLineItemSchema),
      }),
    ),
  )
  .output(z.array(billingInvoiceLineItemSchema));

export const inInvoiceLineItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingInvoiceLineItemSchema));

export const createInvoiceLineItemContract = oc
  .input(billingInvoiceLineItemInsertSchema)
  .output(billingInvoiceLineItemSchema);

export const updateInvoiceLineItemContract = oc
  .input(z.object({ id: z.uuid(), value: billingInvoiceLineItemUpdateSchema }))
  .output(billingInvoiceLineItemSchema);

export const deleteInvoiceLineItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
