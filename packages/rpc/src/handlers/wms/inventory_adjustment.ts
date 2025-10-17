import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/inventory_adjustment'
import {
  InventoryAdjustmentRepository,
  ProductRepository,
  WarehouseRepository,
} from '@packages/db/repositories/wms'
import { UserRepository } from '@packages/db/repositories/auth'

export const PaginateInventoryAdjustment = implement(
  contracts.PaginateInventoryAdjustmentContract,
).$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses, users] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const RangeInventoryAdjustment = implement(contracts.RangeInventoryAdjustmentContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses, users] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const AnyInventoryAdjustment = implement(contracts.AnyInventoryAdjustmentContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses, users] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const InsertInventoryAdjustment = implement(contracts.InsertInventoryAdjustmentContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [product, warehouse, user] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
      UserRepository.fns(context.kysely).find(result.userId),
    ])

    return {
      ...result,
      product: product!,
      warehouse: warehouse!,
      user: user!,
    }
  })

export const InsertManyInventoryAdjustment = implement(
  contracts.InsertManyInventoryAdjustmentContract,
).$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [products, warehouses, users] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
      UserRepository.fns(context.kysely).any(result.map((r) => r.userId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
      user: users.find((u) => u.id === row.userId)!,
    }))
  })

export const UpdateInventoryAdjustment = implement(contracts.UpdateInventoryAdjustmentContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [product, warehouse, user] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
      UserRepository.fns(context.kysely).find(result.userId),
    ])

    return {
      ...result,
      product: product!,
      warehouse: warehouse!,
      user: user!,
    }
  })

export const RemoveInventoryAdjustment = implement(contracts.RemoveInventoryAdjustmentContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = InventoryAdjustmentRepository.fns(context.kysely)
    return await repo.remove(input)
  })
