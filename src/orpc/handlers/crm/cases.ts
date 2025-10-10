import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { CaseRepository } from '@/repositories/crm/cases';

export const paginateCase = implement(crmContracts.paginateCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCase = implement(crmContracts.rangeCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCase = implement(crmContracts.inCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo.in(input).execute();
  });

export const createCase = implement(crmContracts.createCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo.create(input).executeTakeFirstOrThrow();
  });

export const updateCase = implement(crmContracts.updateCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo.update(input.id, input.value).executeTakeFirstOrThrow();
  });

export const deleteCase = implement(crmContracts.deleteCaseContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CaseRepository(context.db);

    return repo.delete(input).executeTakeFirstOrThrow();
  });
