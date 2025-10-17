import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/tms/partner_invoice'
import {
  CarrierRepository,
  PartnerInvoiceItemRepository,
  PartnerInvoiceRepository,
} from '@packages/db/repositories/tms'

export const PaginatePartnerInvoice = implement(contracts.PaginatePartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const result = await partnerInvoiceRepo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [carriers, items] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId)),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: result.map((row) => row.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      carrier: carriers.find((c) => c.id === row.carrierId)!,
      items: items.filter((i) => i.partnerInvoiceId === row.id),
    }))
  })

export const RangePartnerInvoice = implement(contracts.RangePartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const result = await partnerInvoiceRepo.range(input)
    if (result.length === 0) {
      return []
    }

    const [carriers, items] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId)),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: result.map((row) => row.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      carrier: carriers.find((c) => c.id === row.carrierId)!,
      items: items.filter((i) => i.partnerInvoiceId === row.id),
    }))
  })

export const AnyPartnerInvoice = implement(contracts.AnyPartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const result = await partnerInvoiceRepo.any(input)
    if (result.length === 0) {
      return []
    }

    const [carriers, items] = await Promise.all([
      carrierRepo.any(result.map((row) => row.carrierId)),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000, // TODO: make this configurable
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: result.map((row) => row.id) }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      carrier: carriers.find((c) => c.id === row.carrierId)!,
      items: items.filter((i) => i.partnerInvoiceId === row.id),
    }))
  })

export const InsertPartnerInvoice = implement(contracts.InsertPartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const { items, ...invoiceData } = input
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const result = await partnerInvoiceRepo.insert(invoiceData)

    const newItems = await partnerInvoiceItemRepo.insertMany(
      items.map((item) => ({ ...item, partnerInvoiceId: result.id })),
    )

    const carrier = await carrierRepo.find(result.carrierId)

    return {
      ...result,
      carrier,
      items: newItems,
    }
  })

export const InsertManyPartnerInvoice = implement(contracts.InsertManyPartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const result = await partnerInvoiceRepo.insertMany(input.map(({ items, ...d }) => d))
    const allItems = input.flatMap((invoice, i) =>
      invoice.items.map((item) => ({ ...item, partnerInvoiceId: result[i].id })),
    )
    const newItems = await partnerInvoiceItemRepo.insertMany(allItems)

    const carriers = await carrierRepo.any(result.map((r) => r.carrierId))

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check
      carrier: carriers.find((c) => c.id === row.carrierId)!,
      items: newItems.filter((item) => item.partnerInvoiceId === row.id),
    }))
  })

export const UpdatePartnerInvoice = implement(contracts.UpdatePartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    return await partnerInvoiceRepo.update(input.id, input.value)
  })

export const RemovePartnerInvoice = implement(contracts.RemovePartnerInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    return await partnerInvoiceRepo.remove(input)
  })

export const InsertPartnerInvoiceItem = implement(contracts.InsertPartnerInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const newItem = await partnerInvoiceItemRepo.insert(input)
    const result = await partnerInvoiceRepo.find(newItem.partnerInvoiceId)

    const [carrier, items] = await Promise.all([
      carrierRepo.find(result.carrierId),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: [result.id] }],
      }),
    ])

    return {
      ...result,
      carrier,
      items,
    }
  })

export const InsertManyPartnerInvoiceItem = implement(
  contracts.InsertManyPartnerInvoiceItemContract,
).$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const newItems = await partnerInvoiceItemRepo.insertMany(input)
    const invoiceIds = [...new Set(newItems.map((item) => item.partnerInvoiceId))]
    const result = await partnerInvoiceRepo.any(invoiceIds)

    const [carriers, allItems] = await Promise.all([
      carrierRepo.any(result.map((r) => r.carrierId)),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: invoiceIds }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check
      carrier: carriers.find((c) => c.id === row.carrierId)!,
      items: allItems.filter((item) => item.partnerInvoiceId === row.id),
    }))
  })

export const UpdatePartnerInvoiceItem = implement(contracts.UpdatePartnerInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceRepo = PartnerInvoiceRepository.fns(context.kysely)
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    const carrierRepo = CarrierRepository.fns(context.kysely)

    const updatedItem = await partnerInvoiceItemRepo.update(input.id, input.value)
    const result = await partnerInvoiceRepo.find(updatedItem.partnerInvoiceId)

    const [carrier, items] = await Promise.all([
      carrierRepo.find(result.carrierId),
      partnerInvoiceItemRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'partnerInvoiceId', operator: 'in', value: [result.id] }],
      }),
    ])

    return {
      ...result,
      carrier,
      items,
    }
  })

export const RemovePartnerInvoiceItem = implement(contracts.RemovePartnerInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const partnerInvoiceItemRepo = PartnerInvoiceItemRepository.fns(context.kysely)
    return await partnerInvoiceItemRepo.remove(input)
  })
