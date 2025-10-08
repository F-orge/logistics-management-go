import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmInvoiceInsertSchema,
  crmInvoiceSchema,
  crmInvoiceUpdateSchema,
} from '@/schemas/crm/invoices';

export const paginateInvoiceContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmInvoiceSchema),
        sort: sortTransformer(crmInvoiceSchema),
      }),
    ),
  )
  .output(z.array(crmInvoiceSchema));

export const rangeInvoiceContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmInvoiceSchema),
        sort: sortTransformer(crmInvoiceSchema),
      }),
    ),
  )
  .output(z.array(crmInvoiceSchema));

export const inInvoiceContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmInvoiceSchema));

export const createInvoiceContract = oc
  .input(crmInvoiceInsertSchema)
  .output(crmInvoiceSchema);

export const updateInvoiceContract = oc
  .input(z.object({ id: z.uuid(), value: crmInvoiceUpdateSchema }))
  .output(crmInvoiceSchema);

export const deleteInvoiceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
