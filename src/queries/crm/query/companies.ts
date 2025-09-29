import { queryOptions } from '@tanstack/react-query';

import { getCompanies, getCompany } from '@/graphql/queries/crm/companies';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetCompaniesQuery,
  GetCompaniesQueryVariables,
  GetCompanyQuery,
  GetCompanyQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getCompanyQueryOptions = ({ id }: GetCompanyQueryVariables) =>
  queryOptions<GetCompanyQuery['crm']['company'], GraphQLError[]>({
    queryKey: ['crm', 'company', { id }],
    queryFn: () => execute(getCompany, { id }).then((data) => data.crm.company),
    enabled: !!id,
  });

export const getCompaniesQueryOptions = ({ limit = 10, page = 1 }: GetCompaniesQueryVariables) =>
  queryOptions<GetCompaniesQuery['crm']['companies'], GraphQLError[]>({
    queryKey: ['crm', 'companies', { limit, page }],
    queryFn: () => execute(getCompanies, { limit, page }).then((data) => data.crm.companies),
  });
