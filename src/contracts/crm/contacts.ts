import {
  contactSchema,
  insertContactSchema,
  updateContactSchema,
} from '@/db/schemas/crm/contacts.schema';
import { oc } from '@orpc/contract';
import z from 'zod';

export const create = oc.input(insertContactSchema).output(contactSchema);
export const list = oc.output(contactSchema);
export const view = oc.input(z.uuid()).output(contactSchema);
export const update = oc
  .input(z.object({ id: z.uuid(), value: updateContactSchema }))
  .output(contactSchema);
export const remove = oc
  .input(z.uuid())
  .output(z.object({ success: z.boolean() }));
