import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { OpportunityProductRepository } from '@/repositories/crm/opportunityProducts';
import { HonoVariables } from '@/server';

export const paginateOpportunityProduct = implement(
  crmContracts.paginateOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeOpportunityProduct = implement(
  crmContracts.rangeOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inOpportunityProduct = implement(
  crmContracts.inOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo.in(input).execute();
  });

export const createOpportunityProduct = implement(
  crmContracts.createOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateOpportunityProduct = implement(
  crmContracts.updateOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteOpportunityProduct = implement(
  crmContracts.deleteOpportunityProductContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityProductRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
