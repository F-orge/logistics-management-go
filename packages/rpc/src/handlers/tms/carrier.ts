import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/tms/carrier'
import { CarrierRateRepository, CarrierRepository } from '@packages/db/repositories/tms'

export const PaginateCarrier = implement(contracts.PaginateCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const result = await carrierRepo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'carrierId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      rates: rates.filter((r) => r.carrierId === row.id),
    }))
  })

export const RangeCarrier = implement(contracts.RangeCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const result = await carrierRepo.range(input)
    if (result.length === 0) {
      return []
    }

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'carrierId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      rates: rates.filter((r) => r.carrierId === row.id),
    }))
  })

export const AnyCarrier = implement(contracts.AnyCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const result = await carrierRepo.any(input)
    if (result.length === 0) {
      return []
    }

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'carrierId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      rates: rates.filter((r) => r.carrierId === row.id),
    }))
  })

export const InsertCarrier = implement(contracts.InsertCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const result = await carrierRepo.insert(input)

    return {
      ...result,
      rates: [],
    }
  })

export const InsertManyCarrier = implement(contracts.InsertManyCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const result = await carrierRepo.insertMany(input)

    return result.map((row) => ({
      ...row,
      rates: [],
    }))
  })

export const UpdateCarrier = implement(contracts.UpdateCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const result = await carrierRepo.update(input.id, input.value)

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'carrierId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      rates,
    }
  })

export const RemoveCarrier = implement(contracts.RemoveCarrierContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    return await carrierRepo.remove(input)
  })

export const InsertCarrierRate = implement(contracts.InsertCarrierRateContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const carrierRate = await carrierRateRepo.insert(input)
    const result = await carrierRepo.find(carrierRate.carrierId)

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'carrierId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      rates,
    }
  })

export const InsertManyCarrierRate = implement(contracts.InsertManyCarrierRateContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const carrierRates = await carrierRateRepo.insertMany(input)
    const carrierIds = [...new Set(carrierRates.map((cr) => cr.carrierId))]
    const result = await carrierRepo.any(carrierIds)

    const allRates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'carrierId', operator: 'in', value: carrierIds }],
    })

    return result.map((carrier) => ({
      ...carrier,
      rates: allRates.filter((rate) => rate.carrierId === carrier.id),
    }))
  })

export const UpdateCarrierRate = implement(contracts.UpdateCarrierRateContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRepo = CarrierRepository.fns(context.kysely)
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)

    const carrierRate = await carrierRateRepo.update(input.id, input.value)
    const result = await carrierRepo.find(carrierRate.carrierId)

    const rates = await carrierRateRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'carrierId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      rates,
    }
  })

export const RemoveCarrierRate = implement(contracts.RemoveCarrierRateContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const carrierRateRepo = CarrierRateRepository.fns(context.kysely)
    return await carrierRateRepo.remove(input)
  })