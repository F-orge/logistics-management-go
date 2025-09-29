import { queryOptions } from '@tanstack/react-query';

import { getCampaign, getCampaigns } from '@/graphql/queries/crm/campaigns';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetCampaignQuery,
  GetCampaignQueryVariables,
  GetCampaignsQuery,
  GetCampaignsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getCampaignQueryOptions = ({ id }: GetCampaignQueryVariables) =>
  queryOptions<GetCampaignQuery['crm']['campaign'], GraphQLError[]>({
    queryKey: ['crm', 'campaign', { id }],
    queryFn: () => execute(getCampaign, { id }).then((data) => data.crm.campaign),
    enabled: !!id,
  });

export const getCampaignsQueryOptions = ({ limit = 10, page = 1 }: GetCampaignsQueryVariables) =>
  queryOptions<GetCampaignsQuery['crm']['campaigns'], GraphQLError[]>({
    queryKey: ['crm', 'campaigns', { limit, page }],
    queryFn: () => execute(getCampaigns, { limit, page }).then((data) => data.crm.campaigns),
  });
