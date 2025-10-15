import { oc } from '@orpc/contract'
import { PartnerInvoiceItemRepository } from '@packages/db/repositories/tms'
import { PartnerInvoiceItemSchema } from '@packages/db/schemas/tms/partner_invoice_item'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const PaginatePartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.paginateOptionSchema)
  .output(PartnerInvoiceItemSchema.array())

export const RangePartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.rangeOptionSchema)
  .output(PartnerInvoiceItemSchema.array())

export const AnyPartnerInvoiceItemContract = oc
  .input(z.uuid().array())
  .output(PartnerInvoiceItemSchema.array())

export const InsertPartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.InsertSchema)
  .output(PartnerInvoiceItemSchema)

export const InsertManyPartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.InsertSchema.array())
  .output(PartnerInvoiceItemSchema.array())

export const UpdatePartnerInvoiceItemContract = oc
  .input(z.object({ id: z.uuid(), value: PartnerInvoiceItemRepository.schemas.UpdateSchema }))
  .output(PartnerInvoiceItemSchema)

export const RemovePartnerInvoiceItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
