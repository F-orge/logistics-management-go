import { queryOptions } from '@tanstack/react-query';

import { getCase, getCases } from '@/graphql/queries/crm/cases';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetCaseQuery,
  GetCaseQueryVariables,
  GetCasesQuery,
  GetCasesQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getCaseQueryOptions = ({ id }: GetCaseQueryVariables) =>
  queryOptions<GetCaseQuery['crm']['case'], GraphQLError[]>({
    queryKey: ['crm', 'case', { id }],
    queryFn: () => execute(getCase, { id }).then((data) => data.crm.case),
    enabled: !!id,
  });

export const getCasesQueryOptions = ({ limit = 10, page = 1 }: GetCasesQueryVariables) =>
  queryOptions<GetCasesQuery['crm']['cases'], GraphQLError[]>({
    queryKey: ['crm', 'cases', { limit, page }],
    queryFn: () => execute(getCases, { limit, page }).then((data) => data.crm.cases),
  });
