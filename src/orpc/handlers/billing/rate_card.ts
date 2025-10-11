import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/rate_card';
import { RateCardRepository } from '@/repositories/billing/rateCards';
import { HonoVariables } from '@/server';

export const paginateRateCard = implement(
  billingContracts.paginateRateCardContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeRateCard = implement(billingContracts.rangeRateCardContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inRateCard = implement(billingContracts.inRateCardContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo.in(input).execute();
  });

export const createRateCard = implement(billingContracts.createRateCardContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateRateCard = implement(billingContracts.updateRateCardContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteRateCard = implement(billingContracts.deleteRateCardContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new RateCardRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
