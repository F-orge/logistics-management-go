import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orpcClient } from '@/orpc/client';

export const uploadAttachment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.uploadAttachment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.uploadAttachment>[0]
>({
  mutationFn: (options) => orpcClient.crm.uploadAttachment(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Attachment: ${data.fileName} has been uploaded successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.attachments'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const downloadAttachment = (
  options: Parameters<typeof orpcClient.crm.downloadAttachment>[0],
) =>
  queryOptions({
    queryKey: ['crm.attachments', options],
    queryFn: () => orpcClient.crm.downloadAttachment(options),
    enabled: !!options,
  });

export const showAttachmentMetadata = (
  options: Parameters<typeof orpcClient.crm.showAttachmentMetadata>[0],
) =>
  queryOptions({
    queryKey: ['crm.attachments', options],
    queryFn: () => orpcClient.crm.showAttachmentMetadata(options),
    enabled: !!options,
  });

export const deleteAttachment = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteAttachment>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteAttachment>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteAttachment(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.attachments'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
