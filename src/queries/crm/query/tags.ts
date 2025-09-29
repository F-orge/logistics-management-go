import { queryOptions } from '@tanstack/react-query';

import { getTag, getTags } from '@/graphql/queries/crm/tags';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetTagQuery,
  GetTagQueryVariables,
  GetTagsQuery,
  GetTagsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getTagQueryOptions = ({ id }: GetTagQueryVariables) =>
  queryOptions<GetTagQuery['crm']['tag'], GraphQLError[]>({
    queryKey: ['crm', 'tag', { id }],
    queryFn: () => execute(getTag, { id }).then((data) => data.crm.tag),
    enabled: !!id,
  });

export const getTagsQueryOptions = ({ limit = 10, page = 1 }: GetTagsQueryVariables) =>
  queryOptions<GetTagsQuery['crm']['tags'], GraphQLError[]>({
    queryKey: ['crm', 'tags', { limit, page }],
    queryFn: () => execute(getTags, { limit, page }).then((data) => data.crm.tags),
  });
