import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/inventory_stock'
import {
  InventoryBatchRepository,
  InventoryStockRepository,
  LocationRepository,
  ProductRepository,
} from '@packages/db/repositories/wms'

export const PaginateInventoryStock = implement(contracts.PaginateInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [products, locations, batches] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      InventoryBatchRepository.fns(context.kysely).any(
        result.map((r) => r.batchId).filter(nonEmpty),
      ),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      location: locations.find((l) => l.id === row.locationId)!,
      batch: batches.find((b) => b.id === row.batchId),
    }))
  })

export const RangeInventoryStock = implement(contracts.RangeInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [products, locations, batches] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      InventoryBatchRepository.fns(context.kysely).any(
        result.map((r) => r.batchId).filter(nonEmpty),
      ),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      location: locations.find((l) => l.id === row.locationId)!,
      batch: batches.find((b) => b.id === row.batchId),
    }))
  })

export const AnyInventoryStock = implement(contracts.AnyInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [products, locations, batches] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      InventoryBatchRepository.fns(context.kysely).any(
        result.map((r) => r.batchId).filter(nonEmpty),
      ),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      location: locations.find((l) => l.id === row.locationId)!,
      batch: batches.find((b) => b.id === row.batchId),
    }))
  })

export const InsertInventoryStock = implement(contracts.InsertInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [product, location, batch] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      LocationRepository.fns(context.kysely).find(result.locationId),
      result.batchId
        ? InventoryBatchRepository.fns(context.kysely).find(result.batchId)
        : undefined,
    ])

    return {
      ...result,
      product: product!,
      location: location!,
      batch,
    }
  })

export const InsertManyInventoryStock = implement(contracts.InsertManyInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [products, locations, batches] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      InventoryBatchRepository.fns(context.kysely).any(
        result.map((r) => r.batchId).filter(nonEmpty),
      ),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      location: locations.find((l) => l.id === row.locationId)!,
      batch: batches.find((b) => b.id === row.batchId),
    }))
  })

export const UpdateInventoryStock = implement(contracts.UpdateInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [product, location, batch] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      LocationRepository.fns(context.kysely).find(result.locationId),
      result.batchId
        ? InventoryBatchRepository.fns(context.kysely).find(result.batchId)
        : undefined,
    ])

    return {
      ...result,
      product: product!,
      location: location!,
      batch,
    }
  })

export const RemoveInventoryStock = implement(contracts.RemoveInventoryStockContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryStockRepository.fns(context.kysely)
    return await repo.remove(input)
  })
