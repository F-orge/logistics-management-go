import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/product'
import { ProductRepository, SupplierRepository } from '@packages/db/repositories/wms'
import { CompanyRepository } from '@packages/db/repositories/crm'

export const PaginateProduct = implement(contracts.PaginateProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [clients, suppliers] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(result.map((r) => r.clientId).filter(nonEmpty)),
      SupplierRepository.fns(context.kysely).any(result.map((r) => r.supplierId).filter(nonEmpty)),
    ])

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      supplier: suppliers.find((s) => s.id === row.supplierId),
    }))
  })

export const RangeProduct = implement(contracts.RangeProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [clients, suppliers] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(result.map((r) => r.clientId).filter(nonEmpty)),
      SupplierRepository.fns(context.kysely).any(result.map((r) => r.supplierId).filter(nonEmpty)),
    ])

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      supplier: suppliers.find((s) => s.id === row.supplierId),
    }))
  })

export const AnyProduct = implement(contracts.AnyProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [clients, suppliers] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(result.map((r) => r.clientId).filter(nonEmpty)),
      SupplierRepository.fns(context.kysely).any(result.map((r) => r.supplierId).filter(nonEmpty)),
    ])

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      supplier: suppliers.find((s) => s.id === row.supplierId),
    }))
  })

export const InsertProduct = implement(contracts.InsertProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [client, supplier] = await Promise.all([
      result.clientId ? CompanyRepository.fns(context.kysely).find(result.clientId) : undefined,
      result.supplierId ? SupplierRepository.fns(context.kysely).find(result.supplierId) : undefined,
    ])

    return {
      ...result,
      client,
      supplier,
    }
  })

export const InsertManyProduct = implement(contracts.InsertManyProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [clients, suppliers] = await Promise.all([
      CompanyRepository.fns(context.kysely).any(result.map((r) => r.clientId).filter(nonEmpty)),
      SupplierRepository.fns(context.kysely).any(result.map((r) => r.supplierId).filter(nonEmpty)),
    ])

    return result.map((row) => ({
      ...row,
      client: clients.find((c) => c.id === row.clientId),
      supplier: suppliers.find((s) => s.id === row.supplierId),
    }))
  })

export const UpdateProduct = implement(contracts.UpdateProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [client, supplier] = await Promise.all([
      result.clientId ? CompanyRepository.fns(context.kysely).find(result.clientId) : undefined,
      result.supplierId ? SupplierRepository.fns(context.kysely).find(result.supplierId) : undefined,
    ])

    return {
      ...result,
      client,
      supplier,
    }
  })

export const RemoveProduct = implement(contracts.RemoveProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ProductRepository.fns(context.kysely)
    return await repo.remove(input)
  })
