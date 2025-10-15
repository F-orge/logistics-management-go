import { implement } from '@orpc/server'
import { ProductRepository } from '@packages/db/repositories/crm'
import * as contracts from '@/contracts/crm/products'
import type { ORPCContext } from '@/index'

export const PaginateProduct = implement(contracts.PaginateProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.paginate(input)
    return result
  })

export const RangeProduct = implement(contracts.RangeProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.range(input)
    return result
  })

export const AnyProduct = implement(contracts.AnyProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.any(input)
    return result
  })

export const InsertProduct = implement(contracts.InsertProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.insert(input)
    return result
  })

export const InsertManyProduct = implement(contracts.InsertManyProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.insertMany(input)
    return result
  })

export const UpdateProduct = implement(contracts.UpdateProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.update(input.id, input.value)
    return result
  })

export const RemoveProduct = implement(contracts.RemoveProductContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const productRepo = ProductRepository.fns(context.kysely)
    const result = await productRepo.remove(input)
    return result
  })
