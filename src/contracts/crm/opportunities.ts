import { oc } from '@orpc/contract';
import z from 'zod';
import {
  opportunitySchema,
  insertOpportunitySchema,
  updateOpportunitySchema,
} from '@/db/schemas/crm/opportunities.schema';

export const create = oc
  .input(insertOpportunitySchema)
  .output(opportunitySchema);
export const list = oc.output(z.array(opportunitySchema));
export const view = oc.input(z.uuid()).output(opportunitySchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateOpportunitySchema }))
  .output(opportunitySchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
