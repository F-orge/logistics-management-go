import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import { crmOpportunityInsertSchema, crmOpportunitySchema, crmOpportunityUpdateSchema } from '@/schemas/crm/opportunities';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';

export const paginateOpportunityContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmOpportunitySchema),
        sort: sortTransformer(crmOpportunitySchema),
      }),
    ),
  )
  .output(z.array(crmOpportunitySchema));

export const rangeOpportunityContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmOpportunitySchema),
        sort: sortTransformer(crmOpportunitySchema),
      }),
    ),
  )
  .output(z.array(crmOpportunitySchema));

export const inOpportunityContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmOpportunitySchema));

export const createOpportunityContract = oc
  .input(crmOpportunityInsertSchema)
  .output(crmOpportunitySchema);

export const updateOpportunityContract = oc
  .input(z.object({ id: z.uuid(), value: crmOpportunityUpdateSchema }))
  .output(crmOpportunitySchema);

export const deleteOpportunityContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));