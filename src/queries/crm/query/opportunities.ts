import { queryOptions } from '@tanstack/react-query';

import { getOpportunities, getOpportunity } from '@/graphql/queries/crm/opportunities';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetOpportunitiesQuery,
  GetOpportunitiesQueryVariables,
  GetOpportunityQuery,
  GetOpportunityQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getOpportunityQueryOptions = ({ id }: GetOpportunityQueryVariables) =>
  queryOptions<GetOpportunityQuery['crm']['opportunity'], GraphQLError[]>({
    queryKey: ['crm', 'opportunity', { id }],
    queryFn: () => execute(getOpportunity, { id }).then((data) => data.crm.opportunity),
    enabled: !!id,
  });

export const getOpportunitiesQueryOptions = ({ limit = 10, page = 1 }: GetOpportunitiesQueryVariables) =>
  queryOptions<GetOpportunitiesQuery['crm']['opportunities'], GraphQLError[]>({
    queryKey: ['crm', 'opportunities', { limit, page }],
    queryFn: () => execute(getOpportunities, { limit, page }).then((data) => data.crm.opportunities),
  });
