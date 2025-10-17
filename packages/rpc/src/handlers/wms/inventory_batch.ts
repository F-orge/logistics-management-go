import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/inventory_batch'
import { InventoryBatchRepository, ProductRepository } from '@packages/db/repositories/wms'

export const PaginateInventoryBatch = implement(contracts.PaginateInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const products = await ProductRepository.fns(context.kysely).any(
      result.map((r) => r.productId),
    )

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const RangeInventoryBatch = implement(contracts.RangeInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const products = await ProductRepository.fns(context.kysely).any(
      result.map((r) => r.productId),
    )

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const AnyInventoryBatch = implement(contracts.AnyInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const products = await ProductRepository.fns(context.kysely).any(
      result.map((r) => r.productId),
    )

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const InsertInventoryBatch = implement(contracts.InsertInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const product = await ProductRepository.fns(context.kysely).find(result.productId)

    return {
      ...result,
      product: product!,
    }
  })

export const InsertManyInventoryBatch = implement(contracts.InsertManyInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const products = await ProductRepository.fns(context.kysely).any(
      result.map((r) => r.productId),
    )

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const UpdateInventoryBatch = implement(contracts.UpdateInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const product = await ProductRepository.fns(context.kysely).find(result.productId)

    return {
      ...result,
      product: product!,
    }
  })

export const RemoveInventoryBatch = implement(contracts.RemoveInventoryBatchContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryBatchRepository.fns(context.kysely)
    return await repo.remove(input)
  })
