import { insertCompanySchema, updateCompanySchema } from '@/db/schemas';
import { crmCompanySchema } from '@/schemas/crm/companies';
import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';

export const paginateCompanyContract = oc
  .input(z.object({}))
  .output(z.array(crmCompanySchema));

export const rangeCompanyContract = oc
  .input(z.object({}))
  .output(z.array(crmCompanySchema));

export const inCompanyContract = oc
  .input(z.object({}))
  .output(z.array(crmCompanySchema));

export const createCompanyContract = oc
  .input(insertCompanySchema)
  .output(crmCompanySchema);

export const updateCompanyContract = oc
  .input(z.object({ id: z.uuid(), value: updateCompanySchema }))
  .output(crmCompanySchema);

export const deleteCompanyContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
