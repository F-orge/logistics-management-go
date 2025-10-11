import { implement } from '@orpc/server';
import * as billingContracts from '@/orpc/contracts/billing/dispute';
import { DisputeRepository } from '@/repositories/billing/disputes';
import { HonoVariables } from '@/server';

export const paginateDispute = implement(
  billingContracts.paginateDisputeContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeDispute = implement(billingContracts.rangeDisputeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inDispute = implement(billingContracts.inDisputeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo.in(input).execute();
  });

export const createDispute = implement(billingContracts.createDisputeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateDispute = implement(billingContracts.updateDisputeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteDispute = implement(billingContracts.deleteDisputeContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new DisputeRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
