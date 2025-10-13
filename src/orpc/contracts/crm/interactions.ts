import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmInteractionInsertSchema,
  crmInteractionSchema,
  crmInteractionUpdateSchema,
} from '@/schemas/crm/interactions';

export const paginateInteractionContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmInteractionSchema),
        sort: sortTransformer(crmInteractionSchema),
      }),
    ),
  )
  .output(z.array(crmInteractionSchema));

export const rangeInteractionContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmInteractionSchema),
        sort: sortTransformer(crmInteractionSchema),
      }),
    ),
  )
  .output(z.array(crmInteractionSchema));

export const inInteractionContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(crmInteractionSchema));

export const createInteractionContract = oc
  .input(crmInteractionInsertSchema)
  .output(crmInteractionSchema);

export const updateInteractionContract = oc
  .input(z.object({ id: z.uuid(), value: crmInteractionUpdateSchema }))
  .output(crmInteractionSchema);

export const deleteInteractionContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
