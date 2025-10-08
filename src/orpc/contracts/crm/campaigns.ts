import { oc } from '@orpc/contract';
import { DeleteResult } from 'kysely';
import z from 'zod';
import {
  filterTransformer,
  paginateTransformer,
  sortTransformer,
} from '@/repositories/utils';
import {
  crmCampaignInsertSchema,
  crmCampaignSchema,
  crmCampaignUpdateSchema,
} from '@/schemas/crm/campaigns';

export const paginateCampaignContract = oc
  .input(
    paginateTransformer().and(
      z.object({
        filters: filterTransformer(crmCampaignSchema),
        sort: sortTransformer(crmCampaignSchema),
      }),
    ),
  )
  .output(z.array(crmCampaignSchema));

export const rangeCampaignContract = oc
  .input(
    z.object({ from: z.date(), to: z.date() }).and(
      z.object({
        filters: filterTransformer(crmCampaignSchema),
        sort: sortTransformer(crmCampaignSchema),
      }),
    ),
  )
  .output(z.array(crmCampaignSchema));

export const inCampaignContract = oc
  .input(z.array(z.uuid()))
  .output(z.array(crmCampaignSchema));

export const createCampaignContract = oc
  .input(crmCampaignInsertSchema)
  .output(crmCampaignSchema);

export const updateCampaignContract = oc
  .input(z.object({ id: z.uuid(), value: crmCampaignUpdateSchema }))
  .output(crmCampaignSchema);

export const deleteCampaignContract = oc
  .input(z.uuid())
  .output(z.instanceof(DeleteResult));
