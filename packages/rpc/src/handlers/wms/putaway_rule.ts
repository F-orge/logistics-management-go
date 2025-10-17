import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/putaway_rule'
import {
  ProductRepository,
  PutawayRuleRepository,
  WarehouseRepository,
} from '@packages/db/repositories/wms'

export const PaginatePutawayRule = implement(contracts.PaginatePutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
    }))
  })

export const RangePutawayRule = implement(contracts.RangePutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
    }))
  })

export const AnyPutawayRule = implement(contracts.AnyPutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
    }))
  })

export const InsertPutawayRule = implement(contracts.InsertPutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [product, warehouse] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    ])

    return {
      ...result,
      product: product!,
      warehouse: warehouse!,
    }
  })

export const InsertManyPutawayRule = implement(contracts.InsertManyPutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [products, warehouses] = await Promise.all([
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
      WarehouseRepository.fns(context.kysely).any(result.map((r) => r.warehouseId)),
    ])

    return result.map((row) => ({
      ...row,
      product: products.find((p) => p.id === row.productId)!,
      warehouse: warehouses.find((w) => w.id === row.warehouseId)!,
    }))
  })

export const UpdatePutawayRule = implement(contracts.UpdatePutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [product, warehouse] = await Promise.all([
      ProductRepository.fns(context.kysely).find(result.productId),
      WarehouseRepository.fns(context.kysely).find(result.warehouseId),
    ])

    return {
      ...result,
      product: product!,
      warehouse: warehouse!,
    }
  })

export const RemovePutawayRule = implement(contracts.RemovePutawayRuleContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = PutawayRuleRepository.fns(context.kysely)
    return await repo.remove(input)
  })
