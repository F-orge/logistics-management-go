import { oc } from '@orpc/contract'
import { ProofOfDeliveryRepository } from '@packages/db/repositories/dms'
import { DeliveryTaskSchema } from '@packages/db/schemas/dms/delivery_task'
import { ProofOfDeliverySchema } from '@packages/db/schemas/dms/proof_of_delivery'
import { DeleteResult } from 'kysely'
import z from 'zod'

export const OutputSchema = ProofOfDeliverySchema.extend({
  deliveryTask: DeliveryTaskSchema,
})

export const PaginateProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.paginateOptionSchema)
  .output(ProofOfDeliverySchema.array())

export const RangeProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.rangeOptionSchema)
  .output(ProofOfDeliverySchema.array())

export const AnyProofOfDeliveryContract = oc
  .input(z.uuid().array())
  .output(ProofOfDeliverySchema.array())

export const InsertProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.InsertSchema)
  .output(ProofOfDeliverySchema)

export const InsertManyProofOfDeliveryContract = oc
  .input(ProofOfDeliveryRepository.schemas.InsertSchema.array())
  .output(ProofOfDeliverySchema.array())

export const UpdateProofOfDeliveryContract = oc
  .input(z.object({ id: z.uuid(), value: ProofOfDeliveryRepository.schemas.UpdateSchema }))
  .output(ProofOfDeliverySchema)

export const RemoveProofOfDeliveryContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()))
