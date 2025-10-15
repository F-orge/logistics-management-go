import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  crmInvoiceItemInsertSchema,
  crmInvoiceItemSchema,
  crmInvoiceItemUpdateSchema,
} from '@/schemas/crm/invoice_items'

export const paginateInvoiceItemContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmInvoiceItemSchema),
        sort: sortTransformer(crmInvoiceItemSchema),
      }),
    ),
  )
  .output(z.array(crmInvoiceItemSchema))

export const rangeInvoiceItemContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmInvoiceItemSchema),
        sort: sortTransformer(crmInvoiceItemSchema),
      }),
    ),
  )
  .output(z.array(crmInvoiceItemSchema))

export const inInvoiceItemContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(crmInvoiceItemSchema))

export const createInvoiceItemContract = oc
  .input(crmInvoiceItemInsertSchema)
  .output(crmInvoiceItemSchema)

export const updateInvoiceItemContract = oc
  .input(z.object({ id: z.uuid(), value: crmInvoiceItemUpdateSchema }))
  .output(crmInvoiceItemSchema)

export const deleteInvoiceItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
