import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/wms/reorder_point'
import { ReorderPointRepository } from '@packages/db/repositories/wms'

export const PaginateReorderPoint = implement(contracts.PaginateReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.paginate(input)
  })

export const RangeReorderPoint = implement(contracts.RangeReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.range(input)
  })

export const AnyReorderPoint = implement(contracts.AnyReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.any(input)
  })

export const InsertReorderPoint = implement(contracts.InsertReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.insert(input)
  })

export const InsertManyReorderPoint = implement(contracts.InsertManyReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.insertMany(input)
  })

export const UpdateReorderPoint = implement(contracts.UpdateReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.update(input.id, input.value)
  })

export const RemoveReorderPoint = implement(contracts.RemoveReorderPointContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = ReorderPointRepository.fns(context.kysely)
    return await repo.remove(input)
  })
