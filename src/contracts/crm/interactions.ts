import { oc } from '@orpc/contract';
import z from 'zod';
import {
  insertInteractionSchema,
  interactionSchema,
} from '@/db/schemas/crm/interactions.schema';

export const create = oc
  .input(insertInteractionSchema)
  .output(interactionSchema);
export const list = oc.output(z.array(interactionSchema));
export const view = oc.input(z.uuid()).output(interactionSchema);
