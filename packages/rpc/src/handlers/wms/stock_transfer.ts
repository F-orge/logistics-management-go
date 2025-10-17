import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/stock_transfer'
import {
  ProductRepository,
  StockTransferRepository,
  WarehouseRepository,
} from '@packages/db/repositories/wms'

export const PaginateStockTransfer = implement(contracts.PaginateStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any([
        ...result.map((r) => r.sourceWarehouseId),
        ...result.map((r) => r.destinationWarehouseId),
      ]),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      sourceWarehouse: warehouses.find((w) => w.id === row.sourceWarehouseId)!,
      destinationWarehouse: warehouses.find((w) => w.id === row.destinationWarehouseId)!,
    }))
  })

export const RangeStockTransfer = implement(contracts.RangeStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any([
        ...result.map((r) => r.sourceWarehouseId),
        ...result.map((r) => r.destinationWarehouseId),
      ]),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      sourceWarehouse: warehouses.find((w) => w.id === row.sourceWarehouseId)!,
      destinationWarehouse: warehouses.find((w) => w.id === row.destinationWarehouseId)!,
    }))
  })

export const AnyStockTransfer = implement(contracts.AnyStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any([
        ...result.map((r) => r.sourceWarehouseId),
        ...result.map((r) => r.destinationWarehouseId),
      ]),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      sourceWarehouse: warehouses.find((w) => w.id === row.sourceWarehouseId)!,
      destinationWarehouse: warehouses.find((w) => w.id === row.destinationWarehouseId)!,
    }))
  })

export const InsertStockTransfer = implement(contracts.InsertStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [product, sourceWarehouse, destinationWarehouse] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.sourceWarehouseId),
      WarehouseRepository.fns(context.kysely).find(result.destinationWarehouseId),
    ])

    return {
      ...result,
      product: product!,
      sourceWarehouse: sourceWarehouse!,
      destinationWarehouse: destinationWarehouse!,
    }
  })

export const InsertManyStockTransfer = implement(contracts.InsertManyStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any([
        ...result.map((r) => r.sourceWarehouseId),
        ...result.map((r) => r.destinationWarehouseId),
      ]),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      sourceWarehouse: warehouses.find((w) => w.id === row.sourceWarehouseId)!,
      destinationWarehouse: warehouses.find((w) => w.id === row.destinationWarehouseId)!,
    }))
  })

export const UpdateStockTransfer = implement(contracts.UpdateStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [product, sourceWarehouse, destinationWarehouse] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.sourceWarehouseId),
      WarehouseRepository.fns(context.kysely).find(result.destinationWarehouseId),
    ])

    return {
      ...result,
      product: product!,
      sourceWarehouse: sourceWarehouse!,
      destinationWarehouse: destinationWarehouse!,
    }
  })

export const RemoveStockTransfer = implement(contracts.RemoveStockTransferContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = StockTransferRepository.fns(context.kysely)
    return await repo.remove(input)
  })
