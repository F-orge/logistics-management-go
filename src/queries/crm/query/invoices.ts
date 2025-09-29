import { queryOptions } from '@tanstack/react-query';

import { getInvoice, getInvoices } from '@/graphql/queries/crm/invoices';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetInvoiceQuery,
  GetInvoiceQueryVariables,
  GetInvoicesQuery,
  GetInvoicesQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getInvoiceQueryOptions = ({ id }: GetInvoiceQueryVariables) =>
  queryOptions<GetInvoiceQuery['crm']['invoice'], GraphQLError[]>({
    queryKey: ['crm', 'invoice', { id }],
    queryFn: () => execute(getInvoice, { id }).then((data) => data.crm.invoice),
    enabled: !!id,
  });

export const getInvoicesQueryOptions = ({ limit = 10, page = 1 }: GetInvoicesQueryVariables) =>
  queryOptions<GetInvoicesQuery['crm']['invoices'], GraphQLError[]>({
    queryKey: ['crm', 'invoices', { limit, page }],
    queryFn: () => execute(getInvoices, { limit, page }).then((data) => data.crm.invoices),
  });
