import { implement } from '@orpc/server'
import type { ORPCContext } from '@/index'
import { nonEmpty } from '@packages/db/utils'
import * as contracts from '@packages/rpc/contracts/tms/geofence'
import { GeofenceRepository, GeofenceEventRepository } from '@packages/db/repositories/tms'

export const PaginateGeofence = implement(contracts.PaginateGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const result = await geofenceRepo.paginate(input)
    if (result.length === 0) {
      return []
    }

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'geofenceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      events: events.filter((e) => e.geofenceId === row.id),
    }))
  })

export const RangeGeofence = implement(contracts.RangeGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const result = await geofenceRepo.range(input)
    if (result.length === 0) {
      return []
    }

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'geofenceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      events: events.filter((e) => e.geofenceId === row.id),
    }))
  })

export const AnyGeofence = implement(contracts.AnyGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const result = await geofenceRepo.any(input)
    if (result.length === 0) {
      return []
    }

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'geofenceId', operator: 'in', value: result.map((row) => row.id) }],
    })

    return result.map((row) => ({
      ...row,
      events: events.filter((e) => e.geofenceId === row.id),
    }))
  })

export const InsertGeofence = implement(contracts.InsertGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const result = await geofenceRepo.insert(input)

    return {
      ...result,
      events: [],
    }
  })

export const InsertManyGeofence = implement(contracts.InsertManyGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const result = await geofenceRepo.insertMany(input)

    return result.map((row) => ({
      ...row,
      events: [],
    }))
  })

export const UpdateGeofence = implement(contracts.UpdateGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const result = await geofenceRepo.update(input.id, input.value)

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000, // TODO: make this configurable
      filters: [{ column: 'geofenceId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      events,
    }
  })

export const RemoveGeofence = implement(contracts.RemoveGeofenceContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    return await geofenceRepo.remove(input)
  })

export const InsertGeofenceEvent = implement(contracts.InsertGeofenceEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const geofenceEvent = await geofenceEventRepo.insert(input)
    const result = await geofenceRepo.find(geofenceEvent.geofenceId)

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'geofenceId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      events,
    }
  })

export const InsertManyGeofenceEvent = implement(contracts.InsertManyGeofenceEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const geofenceEvents = await geofenceEventRepo.insertMany(input)
    const geofenceIds = [...new Set(geofenceEvents.map((ge) => ge.geofenceId))]
    const result = await geofenceRepo.any(geofenceIds)

    const allEvents = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'geofenceId', operator: 'in', value: geofenceIds }],
    })

    return result.map((geofence) => ({
      ...geofence,
      events: allEvents.filter((event) => event.geofenceId === geofence.id),
    }))
  })

export const UpdateGeofenceEvent = implement(contracts.UpdateGeofenceEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceRepo = GeofenceRepository.fns(context.kysely)
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)

    const geofenceEvent = await geofenceEventRepo.update(input.id, input.value)
    const result = await geofenceRepo.find(geofenceEvent.geofenceId)

    const events = await geofenceEventRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [{ column: 'geofenceId', operator: 'in', value: [result.id] }],
    })

    return {
      ...result,
      events,
    }
  })

export const RemoveGeofenceEvent = implement(contracts.RemoveGeofenceEventContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const geofenceEventRepo = GeofenceEventRepository.fns(context.kysely)
    return await geofenceEventRepo.remove(input)
  })
