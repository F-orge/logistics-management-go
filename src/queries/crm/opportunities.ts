import { ORPCError, ORPCErrorCode } from '@orpc/client';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nonEmpty } from '@/lib/utils';
import { orpcClient } from '@/orpc/client';
import { inUser } from '../auth/user';
import { inCampaign } from './campaigns';
import { inCompany } from './companies';
import { inContact } from './contacts';

export const paginateOpportunity = (
  options: Parameters<typeof orpcClient.crm.paginateOpportunity>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunities', options],
    queryFn: async ({ client }) => {
      const opportunities = await orpcClient.crm.paginateOpportunity(options);

      const ownerPromises = client.ensureQueryData(
        inUser(opportunities.map((row) => row.ownerId)),
      );

      const campaignPromises = client.ensureQueryData(
        inCampaign(opportunities.map((row) => row.campaignId).filter(nonEmpty)),
      );

      const companyPromises = client.ensureQueryData(
        inCompany(opportunities.map((row) => row.companyId).filter(nonEmpty)),
      );

      const contactPromises = client.ensureQueryData(
        inContact(opportunities.map((row) => row.contactId).filter(nonEmpty)),
      );

      const [owners, campaigns, companies, contacts] = await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
      ]);

      return opportunities.map((row) => ({
        ...row,
        owner: owners.find((subRow) => subRow.id === row.ownerId)!,
        campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
        company: companies.find((subRow) => subRow.id === row.companyId),
        contact: contacts.find((subRow) => subRow.id === row.contactId),
      }));
    },
    enabled: !!options,
  });

export const rangeOpportunity = (
  options: Parameters<typeof orpcClient.crm.rangeOpportunity>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunities', options],
    queryFn: () => orpcClient.crm.rangeOpportunity(options),
    enabled: !!options,
  });

export const inOpportunity = (
  options: Parameters<typeof orpcClient.crm.inOpportunity>[0],
) =>
  queryOptions({
    queryKey: ['crm.opportunities', options],
    queryFn: () =>
      options.length >= 1 ? orpcClient.crm.inOpportunity(options) : [],
    enabled: !!options,
  });

export const createOpportunity = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.createOpportunity>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.createOpportunity>[0]
>({
  mutationFn: (options) => orpcClient.crm.createOpportunity(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Opportunity: ${data.name} has been added successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.opportunities'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const updateOpportunity = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.updateOpportunity>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.updateOpportunity>[0]
>({
  mutationFn: (options) => orpcClient.crm.updateOpportunity(options),
  async onSuccess(data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `Opportunity: ${data.name} has been updated successfully`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.opportunities'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});

export const deleteOpportunity = mutationOptions<
  Awaited<ReturnType<typeof orpcClient.crm.deleteOpportunity>>,
  ORPCError<ORPCErrorCode, any>,
  Parameters<typeof orpcClient.crm.deleteOpportunity>[0]
>({
  mutationFn: (options) => orpcClient.crm.deleteOpportunity(options),
  async onSuccess(_data, _variables, _onMutateResult, context) {
    toast.success(`Operation success`, {
      description: `A record has been deleted`,
    });
    await context.client.invalidateQueries({ queryKey: ['crm.opportunities'] });
  },
  async onError(error, _variables, _onMutateResult, _context) {
    toast.error('Operation failed', { description: error.message });
  },
});
