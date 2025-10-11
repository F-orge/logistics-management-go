import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { OpportunityRepository } from '@/repositories/crm/opportunities';
import { HonoVariables } from '@/server';

export const paginateOpportunity = implement(
  crmContracts.paginateOpportunityContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeOpportunity = implement(crmContracts.rangeOpportunityContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inOpportunity = implement(crmContracts.inOpportunityContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo.in(input).execute();
  });

export const createOpportunity = implement(
  crmContracts.createOpportunityContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateOpportunity = implement(
  crmContracts.updateOpportunityContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteOpportunity = implement(
  crmContracts.deleteOpportunityContract,
)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new OpportunityRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
