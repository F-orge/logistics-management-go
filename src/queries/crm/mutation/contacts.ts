import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createContact, removeContact, updateContactName } from '@/graphql/mutations/crm/contacts';
import { execute, type GraphQLError } from '@/lib/graphql/client/execute';
import type {
  CreateContactMutation,
  CreateContactMutationVariables,
  RemoveContactMutation,
  RemoveContactMutationVariables,
  UpdateContactNameMutation,
  UpdateContactNameMutationVariables,
} from '@/lib/graphql/client/graphql';

export const createContactMutationOptions = mutationOptions<
  CreateContactMutation['crm']['createContact'],
  GraphQLError[],
  CreateContactMutationVariables['payload']
>({
  mutationFn: (payload) =>
    execute(createContact, { payload }).then((data) => data.crm.createContact),
  onError: (err) => toast.error(err[0]?.message || 'Failed to create contact'),
  onSuccess: () => toast.success('Contact created successfully'),
});

export const updateContactNameMutationOptions = mutationOptions<
  UpdateContactNameMutation['crm']['updateContactName'],
  GraphQLError[],
  UpdateContactNameMutationVariables
>({
  mutationFn: (variables) =>
    execute(updateContactName, variables).then((data) => data.crm.updateContactName),
  onError: (err) => toast.error(err[0]?.message || 'Failed to update contact name'),
  onSuccess: () => toast.success('Contact name updated successfully'),
});

export const removeContactMutationOptions = mutationOptions<
  RemoveContactMutation['crm']['removeContact'],
  GraphQLError[],
  RemoveContactMutationVariables
>({
  mutationFn: (variables) =>
    execute(removeContact, variables).then((data) => data.crm.removeContact),
  onError: (err) => toast.error(err[0]?.message || 'Failed to remove contact'),
  onSuccess: () => toast.success('Contact removed successfully'),
});
