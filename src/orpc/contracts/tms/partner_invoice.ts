import { oc } from '@orpc/contract'
import { DeleteResult } from 'kysely'
import z from 'zod'
import { filterTransformer, paginateTransformer, sortTransformer } from '@/repositories/utils'
import {
  tmsPartnerInvoiceInsertSchema,
  tmsPartnerInvoiceSchema,
  tmsPartnerInvoiceUpdateSchema,
} from '@/schemas/tms/partner_invoice'

export const paginatePartnerInvoiceContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(tmsPartnerInvoiceSchema),
        sort: sortTransformer(tmsPartnerInvoiceSchema),
      }),
    ),
  )
  .output(z.array(tmsPartnerInvoiceSchema))

export const rangePartnerInvoiceContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(tmsPartnerInvoiceSchema),
        sort: sortTransformer(tmsPartnerInvoiceSchema),
      }),
    ),
  )
  .output(z.array(tmsPartnerInvoiceSchema))

export const inPartnerInvoiceContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(tmsPartnerInvoiceSchema))

export const createPartnerInvoiceContract = oc
  .input(tmsPartnerInvoiceInsertSchema)
  .output(tmsPartnerInvoiceSchema)

export const updatePartnerInvoiceContract = oc
  .input(z.object({ id: z.uuid(), value: tmsPartnerInvoiceUpdateSchema }))
  .output(tmsPartnerInvoiceSchema)

export const deletePartnerInvoiceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).transform((arg) => arg.numDeletedRows.toString()))
