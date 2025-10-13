import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import { crmCampaignSchema } from '@/schemas/crm/campaigns';
import { crmCompanySchema } from '@/schemas/crm/companies';
import {
  crmLeadInsertSchema,
  crmLeadSchema,
  crmLeadUpdateSchema,
} from '@/schemas/crm/leads';
import { crmOpportunitySchema } from '@/schemas/crm/opportunities';

export const paginateLeadContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmLeadSchema),
        sort: sortTransformer(crmLeadSchema),
      }),
    ),
  )
  .output(z.array(crmLeadSchema));

export const rangeLeadContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmLeadSchema),
        sort: sortTransformer(crmLeadSchema),
      }),
    ),
  )
  .output(z.array(crmLeadSchema));

export const inLeadContract = oc
  .input(z.array(z.uuid()).nonempty())
  .output(z.array(crmLeadSchema));

export const createLeadContract = oc
  .input(crmLeadInsertSchema)
  .output(crmLeadSchema);

export const updateLeadContract = oc
  .input(z.object({ id: z.uuid(), value: crmLeadUpdateSchema }))
  .output(crmLeadSchema);

export const deleteLeadContract = oc
  .input(z.uuid())
  .output(
    z
      .instanceof(DeleteResult)
      .transform((arg) => arg.numDeletedRows.toString()),
  );
