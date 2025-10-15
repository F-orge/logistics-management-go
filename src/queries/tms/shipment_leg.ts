import type { ORPCError, ORPCErrorCode } from '@orpc/client'
import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { toast } from 'sonner'
import { nonEmpty } from '@/lib/utils'
import { orpcClient } from '@/orpc/client'
import { inCarrier } from './carrier'
import { paginateShipmentLegEvent } from './shipment_leg_event'
import { inTrip } from './trip'

export const paginateShipmentLeg = (
  options: Parameters<typeof orpcClient.tms.paginateShipmentLeg>[0],
) =>
  queryOptions({
    queryKey: ['tms.shipmentLeg', 'paginate', options],
    queryFn: async ({ client }) => {
      const shipmentLegs = await orpcClient.tms.paginateShipmentLeg(options)

      const carriers = await client.ensureQueryData(
        inCarrier(shipmentLegs.map((row) => row.carrierId).filter(nonEmpty)),
      )

      const trips = await client.ensureQueryData(
        inTrip(shipmentLegs.map((row) => row.internalTripId).filter(nonEmpty)),
      )

      const events = await client.ensureQueryData(
        paginateShipmentLegEvent({
          page: 1,
          perPage: 100,
          filters: [
            {
              column: 'shipmentLegId',
              operation: 'in',
              value: shipmentLegs.map((row) => row.id),
            },
          ],
        }),
      )

      return shipmentLegs.map((row) => ({
        ...row,
        carrier: carriers.find((subRow) => subRow.id === row.carrierId),
        internalTrip: trips.find((subRow) => subRow.id === row.internalTripId),
        events: events.filter((subRow) => subRow.shipmentLegId === row.id),
      }))
    },
    enabled: !!options,
  })

export const rangeShipmentLeg = (options: Parameters<typeof orpcClient.tms.rangeShipmentLeg>[0]) =>
  queryOptions({
    queryKey: ['tms.shipmentLeg', 'range', options],
    queryFn: () => orpcClient.tms.rangeShipmentLeg(options),
    enabled: !!options,
  })

export const inShipmentLeg = (options: Parameters<typeof orpcClient.tms.inShipmentLeg>[0]) =>
  queryOptions({
    queryKey: ['tms.shipmentLeg', 'in', options],
    queryFn: () => orpcClient.tms.inShipmentLeg(options),
    enabled: !!options,
  })

export const createShipmentLeg = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.createShipmentLeg>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.createShipmentLeg>[0]
>({
  mutationFn: (options) => orpcClient.tms.createShipmentLeg(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg: ${data.id} has been added successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLeg'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const updateShipmentLeg = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.updateShipmentLeg>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.updateShipmentLeg>[0]
>({
  mutationFn: (options) => orpcClient.tms.updateShipmentLeg(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg: ${data.id} has been updated successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLeg'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})

export const deleteShipmentLeg = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.tms.deleteShipmentLeg>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.tms.deleteShipmentLeg>[0]
>({
  mutationFn: (options) => orpcClient.tms.deleteShipmentLeg(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Shipment Leg has been deleted successfully`,
    })
    await context.client.invalidateQueries({ queryKey: ['tms.shipmentLeg'] })
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message })
  },
})
