import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  billingInvoiceInsertSchema,
  billingInvoiceSchema,
  billingInvoiceUpdateSchema,
} from '@/schemas/billing/invoice'

export const paginateInvoiceContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(billingInvoiceSchema),
        sort: sortTransformer(billingInvoiceSchema),
      }),
    ),
  )
  .output(z.array(billingInvoiceSchema))

export const rangeInvoiceContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(billingInvoiceSchema),
        sort: sortTransformer(billingInvoiceSchema),
      }),
    ),
  )
  .output(z.array(billingInvoiceSchema))

export const inInvoiceContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(billingInvoiceSchema))

export const createInvoiceContract = oc
  .input(billingInvoiceInsertSchema)
  .output(billingInvoiceSchema)

export const updateInvoiceContract = oc
  .input(z.object({ id: z.uuid(), value: billingInvoiceUpdateSchema }))
  .output(billingInvoiceSchema)

export const deleteInvoiceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
