import {
  interactionSchema,
  insertInteractionSchema,
} from '@/db/schemas/crm/interactions.schema';
import { oc } from '@orpc/contract';
import z from 'zod';

export const create = oc
  .input(insertInteractionSchema)
  .output(interactionSchema);
export const list = oc.output(interactionSchema);
export const view = oc.input(z.uuid()).output(interactionSchema);
