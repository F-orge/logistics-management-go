import { createServerFn } from '@tanstack/react-start';
import { OrderByExpression, OrderByModifiers, SelectExpression } from 'kysely';
import z from 'zod';
import { kyselyDb } from '@/db';
import { DB } from '@/db/types';
import { selectQueryParams } from '@/lib/server-utils';
import { CrmCompanyRepository } from '@/repositories/crm/companies';
import {
  crmCompanyInsertSchema,
  crmCompanySchema,
  crmCompanyUpdateSchema,
} from '@/schemas/crm/companies';

export const selectCrmCompany = createServerFn({ method: 'GET' })
  .inputValidator(selectQueryParams(crmCompanySchema))
  .handler(async ({ data }) => {
    const companyRepository = new CrmCompanyRepository(kyselyDb);

    const result = await companyRepository
      .select(
        data.page,
        data.perPage,
        data.fields as unknown as SelectExpression<DB, 'crm.companies'>,
        data.search,
        data.sort as unknown as {
          field: OrderByExpression<DB, 'crm.companies', {}>;
          order: OrderByModifiers;
        }[],
      )
      .execute();

    return crmCompanySchema.array().parseAsync(result);
  });

export const createCrmCompany = createServerFn({
  method: 'POST',
})
  .inputValidator(crmCompanyInsertSchema)
  .handler(async ({ data }) => {
    const companyRepository = new CrmCompanyRepository(kyselyDb);

    const result = await companyRepository.create(data).executeTakeFirst();

    return crmCompanySchema.parseAsync(result);
  });

export const updateCrmCompany = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid(), value: crmCompanyUpdateSchema }))
  .handler(async ({ data }) => {
    const companyRepository = new CrmCompanyRepository(kyselyDb);

    const result = await companyRepository
      .update(data.id, data.value)
      .executeTakeFirst();

    return crmCompanySchema.parseAsync(result);
  });

export const removeCrmCompany = createServerFn({
  method: 'POST',
})
  .inputValidator(z.object({ id: z.uuid() }))
  .handler(async ({ data }) => {
    const companyRepository = new CrmCompanyRepository(kyselyDb);

    const result = await companyRepository.delete(data.id).executeTakeFirst();

    return result;
  });
