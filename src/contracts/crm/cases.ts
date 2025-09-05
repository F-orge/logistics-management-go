import {
  caseSchema,
  insertCaseSchema,
  updateCaseSchema,
} from '@/db/schemas/crm/cases.schema';
import { oc } from '@orpc/contract';
import z from 'zod';

export const create = oc.input(insertCaseSchema).output(caseSchema);
export const list = oc.output(caseSchema);
export const view = oc.input(z.uuid()).output(caseSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateCaseSchema }))
  .output(caseSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
