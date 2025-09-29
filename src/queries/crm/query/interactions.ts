import { queryOptions } from '@tanstack/react-query';

import { getInteraction, getInteractions } from '@/graphql/queries/crm/interactions';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetInteractionQuery,
  GetInteractionQueryVariables,
  GetInteractionsQuery,
  GetInteractionsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getInteractionQueryOptions = ({ id }: GetInteractionQueryVariables) =>
  queryOptions<GetInteractionQuery['crm']['interaction'], GraphQLError[]>({
    queryKey: ['crm', 'interaction', { id }],
    queryFn: () => execute(getInteraction, { id }).then((data) => data.crm.interaction),
    enabled: !!id,
  });

export const getInteractionsQueryOptions = ({ limit = 10, page = 1 }: GetInteractionsQueryVariables) =>
  queryOptions<GetInteractionsQuery['crm']['interactions'], GraphQLError[]>({
    queryKey: ['crm', 'interactions', { limit, page }],
    queryFn: () => execute(getInteractions, { limit, page }).then((data) => data.crm.interactions),
  });
