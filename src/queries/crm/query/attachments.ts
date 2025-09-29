import { queryOptions } from '@tanstack/react-query';

import { getAttachment, getAttachments } from '@/graphql/queries/crm/attachments';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  GetAttachmentQuery,
  GetAttachmentQueryVariables,
  GetAttachmentsQuery,
  GetAttachmentsQueryVariables,
} from '@/lib/graphql/client/graphql';

export const getAttachmentQueryOptions = ({ id }: GetAttachmentQueryVariables) =>
  queryOptions<GetAttachmentQuery['crm']['attachment'], GraphQLError[]>({
    queryKey: ['crm', 'attachment', { id }],
    queryFn: () => execute(getAttachment, { id }).then((data) => data.crm.attachment),
    enabled: !!id,
  });

export const getAttachmentsQueryOptions = ({ limit = 10, page = 1 }: GetAttachmentsQueryVariables) =>
  queryOptions<GetAttachmentsQuery['crm']['attachments'], GraphQLError[]>({
    queryKey: ['crm', 'attachments', { limit, page }],
    queryFn: () => execute(getAttachments, { limit, page }).then((data) => data.crm.attachments),
  });
