import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmCompanySchema,
  crmCompanyInsertSchema,
  crmCompanyUpdateSchema,
} from '@/schemas/crm/companies';

export const paginateCompanyContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmCompanySchema),
        sort: sortTransformer(crmCompanySchema),
      }),
    ),
  )
  .output(z.array(crmCompanySchema));

export const rangeCompanyContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmCompanySchema),
        sort: sortTransformer(crmCompanySchema),
      }),
    ),
  )
  .output(z.array(crmCompanySchema));

export const inCompanyContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmCompanySchema));

export const createCompanyContract = oc
  .input(crmCompanyInsertSchema)
  .output(crmCompanySchema);

export const updateCompanyContract = oc
  .input(z.object({ id: z.uuid(), value: crmCompanyUpdateSchema }))
  .output(crmCompanySchema);

export const deleteCompanyContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
