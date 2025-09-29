import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import {
  createCompany,
  updateCompanyName,
  updateCompanyStreet,
  updateCompanyCity,
  updateCompanyState,
  updateCompanyPostalCode,
  updateCompanyCountry,
  updateCompanyPhoneNumber,
  updateCompanyIndustry,
  updateCompanyWebsite,
  updateCompanyAnnualRevenue,
  updateCompanyOwnerId,
  removeCompany,
} from '@/graphql/mutations/crm/company';
import type {
  CreateCompanyMutation,
  CreateCompanyMutationVariables,
  UpdateCompanyNameMutation,
  UpdateCompanyNameMutationVariables,
  UpdateCompanyStreetMutation,
  UpdateCompanyStreetMutationVariables,
  UpdateCompanyCityMutation,
  UpdateCompanyCityMutationVariables,
  UpdateCompanyStateMutation,
  UpdateCompanyStateMutationVariables,
  UpdateCompanyPostalCodeMutation,
  UpdateCompanyPostalCodeMutationVariables,
  UpdateCompanyCountryMutation,
  UpdateCompanyCountryMutationVariables,
  UpdateCompanyPhoneNumberMutation,
  UpdateCompanyPhoneNumberMutationVariables,
  UpdateCompanyIndustryMutation,
  UpdateCompanyIndustryMutationVariables,
  UpdateCompanyWebsiteMutation,
  UpdateCompanyWebsiteMutationVariables,
  UpdateCompanyAnnualRevenueMutation,
  UpdateCompanyAnnualRevenueMutationVariables,
  UpdateCompanyOwnerIdMutation,
  UpdateCompanyOwnerIdMutationVariables,
  RemoveCompanyMutation,
  RemoveCompanyMutationVariables,
} from '@/lib/graphql/client/graphql';

export const createCompanyMutation = mutationOptions<
  CreateCompanyMutation['crm']['createCompany'],
  GraphQLError[],
  CreateCompanyMutationVariables['payload']
>({
  mutationFn: (payload) =>
    execute(createCompany, { payload }).then((data) => data.crm.createCompany),
  onError: (err) => toast.error(err[0]?.message || 'Failed to create company'),
  onSuccess: () => toast.success('Company created successfully'),
});

export const updateCompanyNameMutation = mutationOptions<
  UpdateCompanyNameMutation['crm']['updateCompanyName'],
  GraphQLError[],
  UpdateCompanyNameMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyName, variables).then(
      (data) => data.crm.updateCompanyName,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company name'),
  onSuccess: () => toast.success('Company name updated successfully'),
});

export const updateCompanyStreetMutation = mutationOptions<
  UpdateCompanyStreetMutation['crm']['updateCompanyStreet'],
  GraphQLError[],
  UpdateCompanyStreetMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyStreet, variables).then(
      (data) => data.crm.updateCompanyStreet,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company street'),
  onSuccess: () => toast.success('Company street updated successfully'),
});

export const updateCompanyCityMutation = mutationOptions<
  UpdateCompanyCityMutation['crm']['updateCompanyCity'],
  GraphQLError[],
  UpdateCompanyCityMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyCity, variables).then(
      (data) => data.crm.updateCompanyCity,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company city'),
  onSuccess: () => toast.success('Company city updated successfully'),
});

export const updateCompanyStateMutation = mutationOptions<
  UpdateCompanyStateMutation['crm']['updateCompanyState'],
  GraphQLError[],
  UpdateCompanyStateMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyState, variables).then(
      (data) => data.crm.updateCompanyState,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company state'),
  onSuccess: () => toast.success('Company state updated successfully'),
});

export const updateCompanyPostalCodeMutation = mutationOptions<
  UpdateCompanyPostalCodeMutation['crm']['updateCompanyPostalCode'],
  GraphQLError[],
  UpdateCompanyPostalCodeMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyPostalCode, variables).then(
      (data) => data.crm.updateCompanyPostalCode,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company postal code'),
  onSuccess: () => toast.success('Company postal code updated successfully'),
});

export const updateCompanyCountryMutation = mutationOptions<
  UpdateCompanyCountryMutation['crm']['updateCompanyCountry'],
  GraphQLError[],
  UpdateCompanyCountryMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyCountry, variables).then(
      (data) => data.crm.updateCompanyCountry,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company country'),
  onSuccess: () => toast.success('Company country updated successfully'),
});

export const updateCompanyPhoneNumberMutation = mutationOptions<
  UpdateCompanyPhoneNumberMutation['crm']['updateCompanyPhoneNumber'],
  GraphQLError[],
  UpdateCompanyPhoneNumberMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyPhoneNumber, variables).then(
      (data) => data.crm.updateCompanyPhoneNumber,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company phone number'),
  onSuccess: () => toast.success('Company phone number updated successfully'),
});

export const updateCompanyIndustryMutation = mutationOptions<
  UpdateCompanyIndustryMutation['crm']['updateCompanyIndustry'],
  GraphQLError[],
  UpdateCompanyIndustryMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyIndustry, variables).then(
      (data) => data.crm.updateCompanyIndustry,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company industry'),
  onSuccess: () => toast.success('Company industry updated successfully'),
});

export const updateCompanyWebsiteMutation = mutationOptions<
  UpdateCompanyWebsiteMutation['crm']['updateCompanyWebsite'],
  GraphQLError[],
  UpdateCompanyWebsiteMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyWebsite, variables).then(
      (data) => data.crm.updateCompanyWebsite,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company website'),
  onSuccess: () => toast.success('Company website updated successfully'),
});

export const updateCompanyAnnualRevenueMutation = mutationOptions<
  UpdateCompanyAnnualRevenueMutation['crm']['updateCompanyAnnualRevenue'],
  GraphQLError[],
  UpdateCompanyAnnualRevenueMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyAnnualRevenue, variables).then(
      (data) => data.crm.updateCompanyAnnualRevenue,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company annual revenue'),
  onSuccess: () => toast.success('Company annual revenue updated successfully'),
});

export const updateCompanyOwnerIdMutation = mutationOptions<
  UpdateCompanyOwnerIdMutation['crm']['updateCompanyOwnerId'],
  GraphQLError[],
  UpdateCompanyOwnerIdMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateCompanyOwnerId, variables).then(
      (data) => data.crm.updateCompanyOwnerId,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update company owner'),
  onSuccess: () => toast.success('Company owner updated successfully'),
});

export const removeCompanyMutation = mutationOptions<
  RemoveCompanyMutation['crm']['removeCompany'],
  GraphQLError[],
  RemoveCompanyMutationVariables
>({
  mutationFn: (variables) =>
    execute(removeCompany, variables).then((data) => data.crm.removeCompany),
  onError: (err) => toast.error(err[0]?.message || 'Failed to remove company'),
  onSuccess: () => toast.success('Company removed successfully'),
});
