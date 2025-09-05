import {
  leadSchema,
  insertLeadSchema,
  updateLeadSchema,
} from '@/db/schemas/crm/leads.schema';
import { oc } from '@orpc/contract';
import z from 'zod';

export const create = oc.input(insertLeadSchema).output(leadSchema);
export const list = oc.output(leadSchema);
export const view = oc.input(z.uuid()).output(leadSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateLeadSchema }))
  .output(leadSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
