import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/surcharge';
import { SurchargeRepository } from '@/repositories/billing/surcharges';
import { HonoVariables } from '@/server';

export const paginateSurcharge = implement(
  billingContracts.paginateSurchargeContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeSurcharge = implement(billingContracts.rangeSurchargeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inSurcharge = implement(billingContracts.inSurchargeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo.in(input).execute();
  });

export const createSurcharge = implement(
  billingContracts.createSurchargeContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateSurcharge = implement(
  billingContracts.updateSurchargeContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteSurcharge = implement(
  billingContracts.deleteSurchargeContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new SurchargeRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
