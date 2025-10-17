import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import * as contracts from '@packages/rpc/contracts/wms/supplier'
import { SupplierRepository } from '@packages/db/repositories/wms'

export const PaginateSupplier = implement(contracts.PaginateSupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.paginate(input)
  })

export const RangeSupplier = implement(contracts.RangeSupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.range(input)
  })

export const AnySupplier = implement(contracts.AnySupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.any(input)
  })

export const InsertSupplier = implement(contracts.InsertSupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.insert(input)
  })

export const InsertManySupplier = implement(contracts.InsertManySupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.insertMany(input)
  })

export const UpdateSupplier = implement(contracts.UpdateSupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.update(input.id, input.value)
  })

export const RemoveSupplier = implement(contracts.RemoveSupplierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = SupplierRepository.fns(context.kysely)
    return await repo.remove(input)
  })
