import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/wms/warehouse'
import { WarehouseRepository } from '@packages/db/repositories/wms'

export const PaginateWarehouse = implement(contracts.PaginateWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.paginate(input)
  })

export const RangeWarehouse = implement(contracts.RangeWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.range(input)
  })

export const AnyWarehouse = implement(contracts.AnyWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.any(input)
  })

export const InsertWarehouse = implement(contracts.InsertWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.insert(input)
  })

export const InsertManyWarehouse = implement(contracts.InsertManyWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.insertMany(input)
  })

export const UpdateWarehouse = implement(contracts.UpdateWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.update(input.id, input.value)
  })

export const RemoveWarehouse = implement(contracts.RemoveWarehouseContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = WarehouseRepository.fns(context.kysely)
    return await repo.remove(input)
  })
