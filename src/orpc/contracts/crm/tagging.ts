import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  crmTaggingInsertSchema,
  crmTaggingSchema,
  crmTaggingUpdateSchema,
} from '@/schemas/crm/tagging';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';

export const paginateTaggingContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmTaggingSchema),
        sort: sortTransformer(crmTaggingSchema),
      }),
    ),
  )
  .output(z.array(crmTaggingSchema));

export const rangeTaggingContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmTaggingSchema),
        sort: sortTransformer(crmTaggingSchema),
      }),
    ),
  )
  .output(z.array(crmTaggingSchema));

export const inTaggingContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmTaggingSchema));

export const createTaggingContract = oc
  .input(crmTaggingInsertSchema)
  .output(crmTaggingSchema);

export const updateTaggingContract = oc
  .input(z.object({ id: z.uuid(), value: crmTaggingUpdateSchema }))
  .output(z.instanceof(DeleteResult));
