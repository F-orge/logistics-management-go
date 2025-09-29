import { queryOptions } from '@tanstack/react-query';

import { getNotification, getNotifications } from '@/graphql/queries/crm/notifications';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetNotificationQuery,
  GetNotificationQueryVariables,
  GetNotificationsQuery,
  GetNotificationsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getNotificationQueryOptions = ({ id }: GetNotificationQueryVariables) =>
  queryOptions<GetNotificationQuery['crm']['notification'], GraphQLError[]>({
    queryKey: ['crm', 'notification', { id }],
    queryFn: () => execute(getNotification, { id }).then((data) => data.crm.notification),
    enabled: !!id,
  });

export const getNotificationsQueryOptions = ({ limit = 10, page = 1 }: GetNotificationsQueryVariables) =>
  queryOptions<GetNotificationsQuery['crm']['notifications'], GraphQLError[]>({
    queryKey: ['crm', 'notifications', { limit, page }],
    queryFn: () => execute(getNotifications, { limit, page }).then((data) => data.crm.notifications),
  });
