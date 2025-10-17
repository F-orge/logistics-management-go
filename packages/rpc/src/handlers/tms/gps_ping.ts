import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/tms/gps_ping'
import { GpsPingRepository } from '@packages/db/repositories/tms'

export const PaginateGpsPing = implement(contracts.PaginateGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.paginate(input)
  })

export const RangeGpsPing = implement(contracts.RangeGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.range(input)
  })

export const AnyGpsPing = implement(contracts.AnyGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.any(input)
  })

export const InsertGpsPing = implement(contracts.InsertGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.insert(input)
  })

export const InsertManyGpsPing = implement(contracts.InsertManyGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.insertMany(input)
  })

export const UpdateGpsPing = implement(contracts.UpdateGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.update(input.id, input.value)
  })

export const RemoveGpsPing = implement(contracts.RemoveGpsPingContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const gpsPingRepo = GpsPingRepository.fns(context.kysely)
    return await gpsPingRepo.remove(input)
  })
