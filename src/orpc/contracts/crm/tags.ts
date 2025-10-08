import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmTagInsertSchema,
  crmTagSchema,
  crmTagUpdateSchema,
} from '@/schemas/crm/tags';

export const paginateTagContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmTagSchema),
        sort: sortTransformer(crmTagSchema),
      }),
    ),
  )
  .output(z.array(crmTagSchema));

export const rangeTagContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmTagSchema),
        sort: sortTransformer(crmTagSchema),
      }),
    ),
  )
  .output(z.array(crmTagSchema));

export const inTagContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmTagSchema));

export const createTagContract = oc
  .input(crmTagInsertSchema)
  .output(crmTagSchema);

export const updateTagContract = oc
  .input(z.object({ id: z.uuid(), value: crmTagUpdateSchema }))
  .output(z.instanceof(DeleteResult));
