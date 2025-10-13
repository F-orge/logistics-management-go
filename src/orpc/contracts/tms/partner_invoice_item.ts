import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  tmsPartnerInvoiceItemInsertSchema,
  tmsPartnerInvoiceItemSchema,
  tmsPartnerInvoiceItemUpdateSchema,
} from '@/schemas/tms/partner_invoice_item';

export const paginatePartnerInvoiceItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsPartnerInvoiceItemSchema),
        sort: sortTransformer(tmsPartnerInvoiceItemSchema),
      }),
    ),
  )
  .output(z.array(tmsPartnerInvoiceItemSchema));

export const rangePartnerInvoiceItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsPartnerInvoiceItemSchema),
        sort: sortTransformer(tmsPartnerInvoiceItemSchema),
      }),
    ),
  )
  .output(z.array(tmsPartnerInvoiceItemSchema));

export const inPartnerInvoiceItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsPartnerInvoiceItemSchema));

export const createPartnerInvoiceItemContract = oc
  .input(tmsPartnerInvoiceItemInsertSchema)
  .output(tmsPartnerInvoiceItemSchema);

export const updatePartnerInvoiceItemContract = oc
  .input(z.object({ id: z.uuid(), value: tmsPartnerInvoiceItemUpdateSchema }))
  .output(tmsPartnerInvoiceItemSchema);

export const deletePartnerInvoiceItemContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
