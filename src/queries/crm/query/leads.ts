import { queryOptions } from '@tanstack/react-query';

import { getLead, getLeads } from '@/graphql/queries/crm/leads';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetLeadQuery,
  GetLeadQueryVariables,
  GetLeadsQuery,
  GetLeadsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getLeadQueryOptions = ({ id }: GetLeadQueryVariables) =>
  queryOptions<GetLeadQuery['crm']['lead'], GraphQLError[]>({
    queryKey: ['crm', 'lead', { id }],
    queryFn: () => execute(getLead, { id }).then((data) => data.crm.lead),
    enabled: !!id,
  });

export const getLeadsQueryOptions = ({ limit = 10, page = 1 }: GetLeadsQueryVariables) =>
  queryOptions<GetLeadsQuery['crm']['leads'], GraphQLError[]>({
    queryKey: ['crm', 'leads', { limit, page }],
    queryFn: () => execute(getLeads, { limit, page }).then((data) => data.crm.leads),
  });
