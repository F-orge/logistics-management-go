import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/tms/route'
import { RouteRepository } from '@packages/db/repositories/tms'

export const PaginateRoute = implement(contracts.PaginateRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.paginate(input)
  })

export const RangeRoute = implement(contracts.RangeRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.range(input)
  })

export const AnyRoute = implement(contracts.AnyRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.any(input)
  })

export const InsertRoute = implement(contracts.InsertRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.insert(input)
  })

export const InsertManyRoute = implement(contracts.InsertManyRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.insertMany(input)
  })

export const UpdateRoute = implement(contracts.UpdateRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.update(input.id, input.value)
  })

export const RemoveRoute = implement(contracts.RemoveRouteContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = RouteRepository.fns(context.kysely)
    return await repo.remove(input)
  })
