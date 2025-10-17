import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/tms/trip'
import {
  DriverRepository,
  TripRepository,
  TripStopRepository,
  VehicleRepository,
} from '@packages/db/repositories/tms'
import { ProofOfDeliveryRepository } from '@packages/db/repositories/dms'

async function getTrip(context: ORPCContext, tripId: string) {
  const tripRepo = TripRepository.fns(context.kysely)
  const tripStopRepo = TripStopRepository.fns(context.kysely)
  const driverRepo = DriverRepository.fns(context.kysely)
  const vehicleRepo = VehicleRepository.fns(context.kysely)
  const podRepo = ProofOfDeliveryRepository.fns(context.kysely)

  const result = await tripRepo.find(tripId)

  const stops = await tripStopRepo.paginate({
    page: 1,
    perPage: 1000,
    filters: [{ column: 'tripId', operator: 'in', value: [result.id] }],
  })
  const stopIds = stops.map((s) => s.id)

  const [driver, vehicle, pods] = await Promise.all([
    result.driverId ? driverRepo.find(result.driverId) : undefined,
    result.vehicleId ? vehicleRepo.find(result.vehicleId) : undefined,
    podRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'tripStopId', operator: 'in', value: stopIds }],
    }),
  ])

  return {
    ...result,
    driver,
    vehicle,
    stops: stops.map((s) => ({
      ...s,
      proofOfDeliveries: pods.filter((p) => p.tripStopId === s.id),
    })),
  }
}

export const PaginateTrip = implement(contracts.PaginateTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const driverRepo = DriverRepository.fns(context.kysely)
    const vehicleRepo = VehicleRepository.fns(context.kysely)
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)

    const result = await tripRepo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const tripIds = result.map((row) => row.id)
    const stops = await tripStopRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'tripId', operator: 'in', value: tripIds }],
    })
    const stopIds = stops.map((s) => s.id)

    const [drivers, vehicles, pods] = await Promise.all([
      driverRepo.any(result.map((row) => row.driverId).filter(nonEmpty)),
      vehicleRepo.any(result.map((row) => row.vehicleId).filter(nonEmpty)),
      podRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'tripStopId', operator: 'in', value: stopIds }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId),
      vehicle: vehicles.find((v) => v.id === row.vehicleId),
      stops: stops
        .filter((s) => s.tripId === row.id)
        .map((s) => ({
          ...s,
          proofOfDeliveries: pods.filter((p) => p.tripStopId === s.id),
        })),
    }))
  })

export const RangeTrip = implement(contracts.RangeTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const driverRepo = DriverRepository.fns(context.kysely)
    const vehicleRepo = VehicleRepository.fns(context.kysely)
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)

    const result = await tripRepo.range(input)
    if (result.length === 0) {
      return []
    }

    const tripIds = result.map((row) => row.id)
    const stops = await tripStopRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'tripId', operator: 'in', value: tripIds }],
    })
    const stopIds = stops.map((s) => s.id)

    const [drivers, vehicles, pods] = await Promise.all([
      driverRepo.any(result.map((row) => row.driverId).filter(nonEmpty)),
      vehicleRepo.any(result.map((row) => row.vehicleId).filter(nonEmpty)),
      podRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'tripStopId', operator: 'in', value: stopIds }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId),
      vehicle: vehicles.find((v) => v.id === row.vehicleId),
      stops: stops
        .filter((s) => s.tripId === row.id)
        .map((s) => ({
          ...s,
          proofOfDeliveries: pods.filter((p) => p.tripStopId === s.id),
        })),
    }))
  })

export const AnyTrip = implement(contracts.AnyTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const driverRepo = DriverRepository.fns(context.kysely)
    const vehicleRepo = VehicleRepository.fns(context.kysely)
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)

    const result = await tripRepo.any(input)
    if (result.length === 0) {
      return []
    }

    const tripIds = result.map((row) => row.id)
    const stops = await tripStopRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'tripId', operator: 'in', value: tripIds }],
    })
    const stopIds = stops.map((s) => s.id)

    const [drivers, vehicles, pods] = await Promise.all([
      driverRepo.any(result.map((row) => row.driverId).filter(nonEmpty)),
      vehicleRepo.any(result.map((row) => row.vehicleId).filter(nonEmpty)),
      podRepo.paginate({
        page: 1,
        perPage: 1000,
        filters: [{ column: 'tripStopId', operator: 'in', value: stopIds }],
      }),
    ])

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId),
      vehicle: vehicles.find((v) => v.id === row.vehicleId),
      stops: stops
        .filter((s) => s.tripId === row.id)
        .map((s) => ({
          ...s,
          proofOfDeliveries: pods.filter((p) => p.tripStopId === s.id),
        })),
    }))
  })

export const InsertTrip = implement(contracts.InsertTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    const result = await tripRepo.insert(input)

    const [driver, vehicle] = await Promise.all([
      result.driverId ? DriverRepository.fns(context.kysely).find(result.driverId) : undefined,
      result.vehicleId ? VehicleRepository.fns(context.kysely).find(result.vehicleId) : undefined,
    ])

    return {
      ...result,
      driver,
      vehicle,
      stops: [],
    }
  })

export const InsertManyTrip = implement(contracts.InsertManyTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    const result = await tripRepo.insertMany(input)

    const [drivers, vehicles] = await Promise.all([
      DriverRepository.fns(context.kysely).any(result.map((r) => r.driverId).filter(nonEmpty)),
      VehicleRepository.fns(context.kysely).any(result.map((r) => r.vehicleId).filter(nonEmpty)),
    ])

    return result.map((row) => ({
      ...row,
      driver: drivers.find((d) => d.id === row.driverId),
      vehicle: vehicles.find((v) => v.id === row.vehicleId),
      stops: [],
    }))
  })

export const UpdateTrip = implement(contracts.UpdateTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    await tripRepo.update(input.id, input.value)
    return getTrip(context, input.id)
  })

export const RemoveTrip = implement(contracts.RemoveTripContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripRepo = TripRepository.fns(context.kysely)
    return await tripRepo.remove(input)
  })

export const InsertTripStop = implement(contracts.InsertTripStopContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const newStop = await tripStopRepo.insert(input)
    return getTrip(context, newStop.tripId)
  })

export const InsertManyTripStop = implement(contracts.InsertManyTripStopContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const newStops = await tripStopRepo.insertMany(input)
    // Assuming all stops are for the same trip
    return getTrip(context, newStops[0].tripId)
  })

export const UpdateTripStop = implement(contracts.UpdateTripStopContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const updatedStop = await tripStopRepo.update(input.id, input.value)
    return getTrip(context, updatedStop.tripId)
  })

export const RemoveTripStop = implement(contracts.RemoveTripStopContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const removed = await tripStopRepo.remove(input)
    return getTrip(context, removed.tripId)
  })

export const InsertProofOfDelivery = implement(contracts.InsertProofOfDeliveryContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const newPod = await podRepo.insert(input)
    const stop = await tripStopRepo.find(newPod.tripStopId)
    return getTrip(context, stop.tripId)
  })

export const InsertManyProofOfDelivery = implement(contracts.InsertManyProofOfDeliveryContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const newPods = await podRepo.insertMany(input)
    // Assuming all pods are for the same trip
    const stop = await tripStopRepo.find(newPods[0].tripStopId)
    return getTrip(context, stop.tripId)
  })

export const UpdateProofOfDelivery = implement(contracts.UpdateProofOfDeliveryContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const updatedPod = await podRepo.update(input.id, input.value)
    const stop = await tripStopRepo.find(updatedPod.tripStopId)
    return getTrip(context, stop.tripId)
  })

export const RemoveProofOfDelivery = implement(contracts.RemoveProofOfDeliveryContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const podRepo = ProofOfDeliveryRepository.fns(context.kysely)
    const tripStopRepo = TripStopRepository.fns(context.kysely)
    const removedPod = await podRepo.remove(input)
    const stop = await tripStopRepo.find(removedPod.tripStopId)
    return getTrip(context, stop.tripId)
  })