import { implement } from '@orpc/server';
import * as crmContracts from '@/orpc/contracts/crm';
import { HonoVariables } from '@/server';
import { CompanyRepository } from '@/repositories/crm/companies';

export const paginateCompany = implement(crmContracts.paginateCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo
      .paginate(input.page, input.perPage, input.sort, input.filters as any)
      .execute();
  });

export const rangeCompany = implement(crmContracts.rangeCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo
      .range(input.from, input.to, input.sort, input.filters as any)
      .execute();
  });

export const inCompany = implement(crmContracts.inCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo.in(input).execute();
  });

export const createCompany = implement(crmContracts.createCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo.create(input).execute() as any;
  });

export const updateCompany = implement(crmContracts.updateCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo.update(input.id, input.value).execute() as any;
  });

export const deleteCompany = implement(crmContracts.createCompanyContract)
  .$context<HonoVariables>()
  .handler(async ({ context, input }) => {
    const repo = new CompanyRepository(context.db);

    return repo.create(input).execute() as any;
  });
