import { oc } from '@orpc/contract'
import {
  PartnerInvoiceItemRepository,
  PartnerInvoiceRepository,
} from '@packages/db/repositories/tms'
import { CarrierSchema } from '@packages/db/schemas/tms/carrier'
import { PartnerInvoiceSchema } from '@packages/db/schemas/tms/partner_invoice'
import { PartnerInvoiceItemSchema } from '@packages/db/schemas/tms/partner_invoice_item'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = PartnerInvoiceSchema.extend({
  carrier: CarrierSchema,
  items: PartnerInvoiceItemSchema.array(),
})

export const PaginatePartnerInvoiceContract = oc
  .input(PartnerInvoiceRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangePartnerInvoiceContract = oc
  .input(PartnerInvoiceRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyPartnerInvoiceContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertPartnerInvoiceContract = oc
  .input(
    PartnerInvoiceRepository.schemas.InsertSchema.extend({
      items: PartnerInvoiceItemRepository.schemas.InsertSchema.array(),
    }),
  )
  .output(OutputSchema)

export const InsertManyPartnerInvoiceContract = oc
  .input(
    PartnerInvoiceRepository.schemas.InsertSchema.extend({
      items: PartnerInvoiceItemRepository.schemas.InsertSchema.array(),
    }).array(),
  )
  .output(OutputSchema.array())

export const UpdatePartnerInvoiceContract = oc
  .input(z.object({ id: z.uuid(), value: PartnerInvoiceRepository.schemas.UpdateSchema }))
  .output(PartnerInvoiceSchema)

export const RemovePartnerInvoiceContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertPartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyPartnerInvoiceItemContract = oc
  .input(PartnerInvoiceItemRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdatePartnerInvoiceItemContract = oc
  .input(z.object({ id: z.uuid(), value: PartnerInvoiceItemRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemovePartnerInvoiceItemContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
