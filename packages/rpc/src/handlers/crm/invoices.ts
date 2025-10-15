import { implement } from '@orpc/server'
import {
  InvoiceRepository,
  InvoiceItemRepository,
  OpportunityRepository,
} from '@packages/db/repositories/crm'
import { ProductRepository } from '@packages/db/repositories/crm'
import * as contracts from '@/contracts/crm/invoices'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'

export const PaginateInvoice = implement(contracts.PaginateInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const result = await invoiceRepo.paginate(input)

    const invoiceItems = await invoiceItemRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'invoiceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    const productIds = invoiceItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any(result.map((row) => row.opportunityId).filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    return result.map((row) => ({
      ...row,
      opportunity: opportunities.find((o) => o.id === row.opportunityId),
      items: invoiceItems
        .filter((item) => item.invoiceId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }))
  })

export const RangeInvoice = implement(contracts.RangeInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const result = await invoiceRepo.range(input)

    const invoiceItems = await invoiceItemRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'invoiceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    const productIds = invoiceItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any(result.map((row) => row.opportunityId).filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    return result.map((row) => ({
      ...row,
      opportunity: opportunities.find((o) => o.id === row.opportunityId),
      items: invoiceItems
        .filter((item) => item.invoiceId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }))
  })

export const AnyInvoice = implement(contracts.AnyInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const result = await invoiceRepo.any(input)

    const invoiceItems = await invoiceItemRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'invoiceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    const productIds = invoiceItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any(result.map((row) => row.opportunityId).filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    return result.map((row) => ({
      ...row,
      opportunity: opportunities.find((o) => o.id === row.opportunityId),
      items: invoiceItems
        .filter((item) => item.invoiceId === row.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }))
  })

export const InsertInvoice = implement(contracts.InsertInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const { items, ...invoiceInput } = input
    const result = await invoiceRepo.insert(invoiceInput)

    const insertedItems = await invoiceItemRepo.insertMany(
      items.map((item) => ({ ...item, invoiceId: result.id })),
    )

    const productIds = insertedItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any([result.opportunityId || '']),
      productRepo.any(productIds),
    ])

    return {
      ...result,
      opportunity: opportunities.find((o) => o.id === result.opportunityId),
      items: insertedItems.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId)!,
      })),
    }
  })

export const InsertManyInvoice = implement(contracts.InsertManyInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const results = await invoiceRepo.insertMany(
      input.map(({ items, ...invoiceInput }) => invoiceInput),
    )

    const allItemsToInsert = input.flatMap((invoiceInput, index) =>
      invoiceInput.items.map((item) => ({ ...item, invoiceId: results[index]!.id })),
    )

    const insertedItems = await invoiceItemRepo.insertMany(allItemsToInsert)

    const productIds = insertedItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any(results.map((row) => row.opportunityId).filter(nonEmpty)),
      productRepo.any(productIds),
    ])

    return results.map((invoice) => ({
      ...invoice,
      opportunity: opportunities.find((o) => o.id === invoice.opportunityId),
      items: insertedItems
        .filter((item) => item.invoiceId === invoice.id)
        .map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
    }))
  })

export const UpdateInvoice = implement(contracts.UpdateInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)

    const result = await invoiceRepo.update(input.id, input.value)

    const invoiceItems = await invoiceItemRepo.paginate({
      page: 1,
      perPage: Infinity,
      filters: [{ column: 'invoiceId', operator: 'in', value: [result.id] }],
    })

    const productIds = invoiceItems.map((row) => row.productId).filter(nonEmpty)

    const [opportunities, products] = await Promise.all([
      opportunityRepo.any([result.opportunityId || '']),
      productRepo.any(productIds),
    ])

    return {
      ...result,
      opportunity: opportunities.find((o) => o.id === result.opportunityId),
      items: invoiceItems.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId)!,
      })),
    }
  })

export const RemoveInvoice = implement(contracts.RemoveInvoiceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    return invoiceRepo.remove(input)
  })

export const InsertInvoiceItem = implement(contracts.InsertInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const { items, ...invoiceItemInput } = input
    const result = await invoiceItemRepo.insert(invoiceItemInput)

    const product = await productRepo.find(result.productId)
    const invoice = await invoiceRepo.find(result.invoiceId)
    const opportunity = invoice?.opportunityId
      ? await opportunityRepo.find(invoice.opportunityId)
      : undefined

    return {
      ...invoice!,
      opportunity: opportunity,
      items: [{ ...result, product: product! }],
    }
  })

export const InsertManyInvoiceItem = implement(contracts.InsertManyInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const results = await invoiceItemRepo.insertMany(input)

    const productIds = results.map((row) => row.productId).filter(nonEmpty)
    const invoiceIds = results.map((row) => row.invoiceId).filter(nonEmpty)

    const [products, invoices] = await Promise.all([
      productRepo.any(productIds),
      invoiceRepo.any(invoiceIds),
    ])

    const opportunityIds = invoices.map((row) => row.opportunityId).filter(nonEmpty)
    const opportunities = await opportunityRepo.any(opportunityIds)

    const groupedItems = results.reduce(
      (acc, item) => {
        if (!acc[item.invoiceId]) {
          acc[item.invoiceId] = []
        }
        acc[item.invoiceId]?.push(item)
        return acc
      },
      {} as Record<string, typeof results>,
    )

    return Object.entries(groupedItems).map(([invoiceId, items]) => {
      const invoice = invoices.find((inv) => inv.id === invoiceId)
      const opportunity = opportunities.find((opp) => opp.id === invoice?.opportunityId)
      return {
        ...invoice!,
        opportunity: opportunity,
        items: items.map((item) => ({
          ...item,
          product: products.find((p) => p.id === item.productId)!,
        })),
      }
    })
  })

export const UpdateInvoiceItem = implement(contracts.UpdateInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    const productRepo = ProductRepository.fns(context.kysely)
    const invoiceRepo = InvoiceRepository.fns(context.kysely)
    const opportunityRepo = OpportunityRepository.fns(context.kysely)

    const result = await invoiceItemRepo.update(input.id, input.value)

    const product = await productRepo.find(result.productId)
    const invoice = await invoiceRepo.find(result.invoiceId)
    const opportunity = invoice?.opportunityId
      ? await opportunityRepo.find(invoice.opportunityId)
      : undefined

    return {
      ...invoice!,
      opportunity: opportunity,
      items: [{ ...result, product: product! }],
    }
  })

export const RemoveInvoiceItem = implement(contracts.RemoveInvoiceItemContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const invoiceItemRepo = InvoiceItemRepository.fns(context.kysely)
    return invoiceItemRepo.remove(input)
  })
