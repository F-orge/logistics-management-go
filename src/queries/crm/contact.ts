import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import {
  createContact,
  updateContactName,
  updateContactEmail,
  updateContactPhoneNumber,
  updateContactJobTitle,
  updateContactCompanyId,
  updateContactOwnerId,
  removeContact,
} from '@/graphql/mutations/crm/contact';
import type {
  CreateContactMutation,
  CreateContactMutationVariables,
  UpdateContactNameMutation,
  UpdateContactNameMutationVariables,
  UpdateContactEmailMutation,
  UpdateContactEmailMutationVariables,
  UpdateContactPhoneNumberMutation,
  UpdateContactPhoneNumberMutationVariables,
  UpdateContactJobTitleMutation,
  UpdateContactJobTitleMutationVariables,
  UpdateContactCompanyIdMutation,
  UpdateContactCompanyIdMutationVariables,
  UpdateContactOwnerIdMutation,
  UpdateContactOwnerIdMutationVariables,
  RemoveContactMutation,
  RemoveContactMutationVariables,
} from '@/lib/graphql/client/graphql';

export const createContactMutation = mutationOptions<
  CreateContactMutation['crm']['createContact'],
  GraphQLError[],
  CreateContactMutationVariables['payload']
>({
  mutationFn: (payload) =>
    execute(createContact, { payload }).then((data) => data.crm.createContact),
  onError: (err) => toast.error(err[0]?.message || 'Failed to create contact'),
  onSuccess: () => toast.success('Contact created successfully'),
});

export const updateContactNameMutation = mutationOptions<
  UpdateContactNameMutation['crm']['updateContactName'],
  GraphQLError[],
  UpdateContactNameMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactName, variables).then(
      (data) => data.crm.updateContactName,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact name'),
  onSuccess: () => toast.success('Contact name updated successfully'),
});

export const updateContactEmailMutation = mutationOptions<
  UpdateContactEmailMutation['crm']['updateContactEmail'],
  GraphQLError[],
  UpdateContactEmailMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactEmail, variables).then(
      (data) => data.crm.updateContactEmail,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact email'),
  onSuccess: () => toast.success('Contact email updated successfully'),
});

export const updateContactPhoneNumberMutation = mutationOptions<
  UpdateContactPhoneNumberMutation['crm']['updateContactPhoneNumber'],
  GraphQLError[],
  UpdateContactPhoneNumberMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactPhoneNumber, variables).then(
      (data) => data.crm.updateContactPhoneNumber,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact phone number'),
  onSuccess: () => toast.success('Contact phone number updated successfully'),
});

export const updateContactJobTitleMutation = mutationOptions<
  UpdateContactJobTitleMutation['crm']['updateContactJobTitle'],
  GraphQLError[],
  UpdateContactJobTitleMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactJobTitle, variables).then(
      (data) => data.crm.updateContactJobTitle,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact job title'),
  onSuccess: () => toast.success('Contact job title updated successfully'),
});

export const updateContactCompanyIdMutation = mutationOptions<
  UpdateContactCompanyIdMutation['crm']['updateContactCompanyId'],
  GraphQLError[],
  UpdateContactCompanyIdMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactCompanyId, variables).then(
      (data) => data.crm.updateContactCompanyId,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact company'),
  onSuccess: () => toast.success('Contact company updated successfully'),
});

export const updateContactOwnerIdMutation = mutationOptions<
  UpdateContactOwnerIdMutation['crm']['updateContactOwnerId'],
  GraphQLError[],
  UpdateContactOwnerIdMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactOwnerId, variables).then(
      (data) => data.crm.updateContactOwnerId,
    ),
  onError: (err) =>
    toast.error(err[0]?.message || 'Failed to update contact owner'),
  onSuccess: () => toast.success('Contact owner updated successfully'),
});

export const removeContactMutation = mutationOptions<
  RemoveContactMutation['crm']['removeContact'],
  GraphQLError[],
  RemoveContactMutationVariables
>({
  mutationFn: (variables) =>
    execute(removeContact, variables).then((data) => data.crm.removeContact),
  onError: (err) => toast.error(err[0]?.message || 'Failed to remove contact'),
  onSuccess: () => toast.success('Contact removed successfully'),
});
