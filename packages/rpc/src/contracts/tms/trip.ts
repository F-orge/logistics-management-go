import { oc } from '@orpc/contract'
import { ProofOfDeliveryRepository } from '@packages/db/repositories/dms'
import { TripRepository, TripStopRepository } from '@packages/db/repositories/tms'
import { ProofOfDeliverySchema } from '@packages/db/schemas/dms/proof_of_delivery'
import { DriverSchema } from '@packages/db/schemas/tms/driver'
import { TripSchema } from '@packages/db/schemas/tms/trip'
import { TripStopSchema } from '@packages/db/schemas/tms/trip_stop'
import { VehicleSchema } from '@packages/db/schemas/tms/vehicle'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = TripSchema.extend({
  driver: DriverSchema.optional(),
  vehicle: VehicleSchema.optional(),
  stops: TripStopSchema.extend({
    proofOfDeliveries: ProofOfDeliverySchema.array(),
  }).array(),
})

export const PaginateTripContract = oc
  .input(TripRepository.schemas.paginateOptionSchema)
  .output(OutputSchema.array())

export const RangeTripContract = oc
  .input(TripRepository.schemas.rangeOptionSchema)
  .output(OutputSchema.array())

export const AnyTripContract = oc.input(z.uuid().array()).output(OutputSchema.array())

export const InsertTripContract = oc.input(TripRepository.schemas.InsertSchema).output(OutputSchema)

export const InsertManyTripContract = oc
  .input(TripRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateTripContract = oc
  .input(z.object({ id: z.uuid(), value: TripRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveTripContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertTripStopContract = oc
  .input(TripStopRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyTripStopContract = oc
  .input(TripStopRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateTripStopContract = oc
  .input(z.object({ id: z.uuid(), value: TripStopRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveTripStopContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))

export const InsertProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.InsertSchema)
  .output(OutputSchema)

export const InsertManyProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.InsertSchema.array())
  .output(OutputSchema.array())

export const UpdateProofOfDeliveryContract = oc
  .input(z.object({ id: z.uuid(), value: ProofOfDeliveryRepository.schemas.UpdateSchema }))
  .output(OutputSchema)

export const RemoveProofOfDeliveryContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
