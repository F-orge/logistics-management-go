import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { type InsertRecord, pb, type UpdateRecord } from '../../lib/pocketbase';
import type {
  CompaniesResponse,
  DepartmentsResponse,
  UsersRecord,
  UsersResponse,
} from '../../lib/pocketbase.gen';

export type ExpandedUsersResponse = UsersResponse<{
  company?: CompaniesResponse;
  department?: DepartmentsResponse;
}>;

export const getUsers = (page: number, perPage: number, filter?: string) =>
  queryOptions({
    queryKey: ['users', page, perPage, filter],
    queryFn: () =>
      pb.collection('users').getList<ExpandedUsersResponse>(page, perPage, {
        filter,
        expand: 'company,department',
      }),
  });

export const getUser = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () =>
      pb.collection('users').getOne(id, { expand: 'company,department' }),
  });

export const useMutateUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Omit<UpdateRecord<UsersRecord>, 'avatar'> & { avatar?: File };
    }) => pb.collection('users').update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useMutateCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: Omit<InsertRecord<UsersRecord>, 'avatar'> & { avatar?: File };
    }) => pb.collection('users').create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useMutateRemoveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
    }: {
      id: string;
    }) => pb.collection('users').delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
