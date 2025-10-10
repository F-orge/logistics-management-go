import { orpcClient } from '@/orpc/client';
import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

export const paginateLead = (
  options: Parameters<typeof orpcClient.crm.paginateLead>[0],
) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: () => orpcClient.crm.paginateLead(options),
    enabled: !!options,
  });

export const rangeLead = (
  options: Parameters<typeof orpcClient.crm.rangeLead>[0],
) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: () => orpcClient.crm.rangeLead(options),
    enabled: !!options,
  });

export const inLead = (
  options: Parameters<typeof orpcClient.crm.inLead>[0],
) =>
  queryOptions({
    queryKey: ['crm.leads', options],
    queryFn: () => orpcClient.crm.inLead(options),
    enabled: !!options,
  });

export const createLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.createLead(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Lead: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateLead(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Lead: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteLead = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteLead>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteLead>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteLead(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.leads'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
