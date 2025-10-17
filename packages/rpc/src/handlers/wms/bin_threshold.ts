import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/wms/bin_threshold'
import {
  BinThresholdRepository,
  LocationRepository,
  ProductRepository,
} from '@packages/db/repositories/wms'

export const PaginateBinThreshold = implement(contracts.PaginateBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const [locations, products] = await Promise.all([
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
    ])

    return result.map((row) => ({
      ...row,
      location: locations.find((l) => l.id === row.locationId)!,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const RangeBinThreshold = implement(contracts.RangeBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.range(input)
    if (result.length === 0) {
      return []
    }

    const [locations, products] = await Promise.all([
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
    ])

    return result.map((row) => ({
      ...row,
      location: locations.find((l) => l.id === row.locationId)!,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const AnyBinThreshold = implement(contracts.AnyBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.any(input)
    if (result.length === 0) {
      return []
    }

    const [locations, products] = await Promise.all([
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
    ])

    return result.map((row) => ({
      ...row,
      location: locations.find((l) => l.id === row.locationId)!,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const InsertBinThreshold = implement(contracts.InsertBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.insert(input)

    const [location, product] = await Promise.all([
      LocationRepository.fns(context.kysely).find(result.locationId),
      ProductRepository.fns(context.kysely).find(result.productId),
    ])

    return {
      ...result,
      location: location!,
      product: product!,
    }
  })

export const InsertManyBinThreshold = implement(contracts.InsertManyBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.insertMany(input)

    const [locations, products] = await Promise.all([
      LocationRepository.fns(context.kysely).any(result.map((r) => r.locationId)),
      ProductRepository.fns(context.kysely).any(result.map((r) => r.productId)),
    ])

    return result.map((row) => ({
      ...row,
      location: locations.find((l) => l.id === row.locationId)!,
      product: products.find((p) => p.id === row.productId)!,
    }))
  })

export const UpdateBinThreshold = implement(contracts.UpdateBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    const result = await repo.update(input.id, input.value)

    const [location, product] = await Promise.all([
      LocationRepository.fns(context.kysely).find(result.locationId),
      ProductRepository.fns(context.kysely).find(result.productId),
    ])

    return {
      ...result,
      location: location!,
      product: product!,
    }
  })

export const RemoveBinThreshold = implement(contracts.RemoveBinThresholdContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const repo = BinThresholdRepository.fns(context.kysely)
    return await repo.remove(input)
  })
