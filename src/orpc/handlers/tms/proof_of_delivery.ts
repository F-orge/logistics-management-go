import { implement } from '@orpc/server';
import * as tmsContracts from '@/orpc/contracts/tms/proof_of_delivery';
import { ProofOfDeliveryRepository } from '@/repositories/tms/proofOfDeliveries';
import { HonoVariables } from '@/server';

export const paginateProofOfDelivery = implement(
  tmsContracts.paginateProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeProofOfDelivery = implement(
  tmsContracts.rangeProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inProofOfDelivery = implement(
  tmsContracts.inProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo.in(input).execute();
  });

export const createProofOfDelivery = implement(
  tmsContracts.createProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateProofOfDelivery = implement(
  tmsContracts.updateProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteProofOfDelivery = implement(
  tmsContracts.deleteProofOfDeliveryContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new ProofOfDeliveryRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
