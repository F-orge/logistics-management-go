import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmOpportunityProductInsertSchema,
  crmOpportunityProductSchema,
  crmOpportunityProductUpdateSchema,
} from '@/schemas/crm/opportunity_products';

export const paginateOpportunityProductContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmOpportunityProductSchema),
        sort: sortTransformer(crmOpportunityProductSchema),
      }),
    ),
  )
  .output(z.array(crmOpportunityProductSchema));

export const rangeOpportunityProductContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmOpportunityProductSchema),
        sort: sortTransformer(crmOpportunityProductSchema),
      }),
    ),
  )
  .output(z.array(crmOpportunityProductSchema));

export const inOpportunityProductContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmOpportunityProductSchema));

export const createOpportunityProductContract = oc
  .input(crmOpportunityProductInsertSchema)
  .output(crmOpportunityProductSchema);

export const updateOpportunityProductContract = oc
  .input(z.object({ id: z.uuid(), value: crmOpportunityProductUpdateSchema }))
  .output(crmOpportunityProductSchema);

export const deleteOpportunityProductContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
