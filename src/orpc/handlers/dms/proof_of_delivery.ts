import { implement } from '@orpc/server'
import * as dmsContracts from '@/orpc/contracts/dms/proof_of_delivery'
import { ProofOfDeliveryRepository } from '@/repositories/dms/proofOfDeliveries'
import type { HonoVariables } from '@/server'

export const paginateProofOfDelivery = implement(dmsContracts.paginateProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.paginate(input.page, input.perPage, input.sort, input.filters as any).execute()
  })

export const rangeProofOfDelivery = implement(dmsContracts.rangeProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.range(input.from, input.to, input.sort, input.filters as any).execute()
  })

export const inProofOfDelivery = implement(dmsContracts.inProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.in(input).execute()
  })

export const createProofOfDelivery = implement(dmsContracts.createProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.create(input).executeTakeFirstOrThrow()
  })

export const updateProofOfDelivery = implement(dmsContracts.updateProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.update(input.id, input.value).executeTakeFirstOrThrow()
  })

export const deleteProofOfDelivery = implement(dmsContracts.deleteProofOfDeliveryContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db)

    return repo.delete(input).executeTakeFirstOrThrow()
  })
