import { queryOptions } from '@tanstack/react-query';

import { getContact, getContacts } from '@/graphql/queries/crm/contacts';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetContactQuery,
  GetContactQueryVariables,
  GetContactsQuery,
  GetContactsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getContactQueryOptions = ({ id }: GetContactQueryVariables) =>
  queryOptions<GetContactQuery['crm']['contact'], GraphQLError[]>({
    queryKey: ['crm', 'contact', { id }],
    queryFn: () => execute(getContact, { id }).then((data) => data.crm.contact),
    enabled: !!id,
  });

export const getContactsQueryOptions = ({ limit = 10, page = 1 }: GetContactsQueryVariables) =>
  queryOptions<GetContactsQuery['crm']['contacts'], GraphQLError[]>({
    queryKey: ['crm', 'contacts', { limit, page }],
    queryFn: () => execute(getContacts, { limit, page }).then((data) => data.crm.contacts),
  });
