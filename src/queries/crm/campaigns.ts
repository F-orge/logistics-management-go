import { mutationOptions, queryOptions } from '@tanstack/react-query';
import z from 'zod';
import { DeleteResult } from 'kysely';
import {
  createCrmCampaign,
  removeCrmCampaign,
  selectCrmCampaign,
  updateCrmCampaign,
} from '@/actions/crm/campaigns';
import {
  insertCampaignSchema,
  updateCampaignSchema,
} from '@/db/schemas';
import { crmCampaignSchema } from '@/schemas/crm/campaigns';

export const crmCampaignQueryOption = (page: number, perPage: number) =>
  queryOptions({
    queryKey: ['crm.campaigns', page, perPage],
    queryFn: () =>
      selectCrmCampaign({
        data: { page, perPage, sort: [{ field: 'createdAt', order: 'asc' }] },
      }),
  });

export const crmCampaignCreateMutationOption = mutationOptions<
  z.infer<typeof crmCampaignSchema>,
  void,
  z.infer<typeof insertCampaignSchema>
>({
  mutationFn: (value) => createCrmCampaign({ data: value }),
});

export const crmCampaignUpdateMutationOption = (id: string) =>
  mutationOptions<
    z.infer<typeof crmCampaignSchema>,
    void,
    z.infer<typeof updateCampaignSchema>
  >({
    mutationFn: (value) => updateCrmCampaign({ data: { id, value } }),
  });

export const crmCampaignRemoveMutationOption = mutationOptions<
  DeleteResult,
  void,
  { id: string }
>({
  mutationFn: ({ id }) => removeCrmCampaign({ data: { id } }),
});