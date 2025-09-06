import { oc } from '@orpc/contract';
import z from 'zod';
import {
  companySchema,
  insertCompanySchema,
  updateCompanySchema,
} from '@/db/schemas/crm/companies.schema';

export const create = oc.input(insertCompanySchema).output(companySchema);
export const list = oc.output(z.array(companySchema));
export const view = oc.input(z.uuid()).output(companySchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateCompanySchema }))
  .output(companySchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
