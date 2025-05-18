import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { type InsertRecord, type UpdateRecord, pb } from '../../lib/pocketbase';
import type {
  DepartmentsResponse,
  OrdersResponse,
  ShipmentsResponse,
  TaskMessagesRecord,
  TaskMessagesResponse,
  TasksRecord,
  TasksResponse,
  TypedPocketBase,
  UsersResponse,
} from '../../lib/pocketbase.gen';

export type ExpandedTaskResponse = TasksResponse<{
  assignees?: UsersResponse[];
  assigner: UsersResponse;
  department?: DepartmentsResponse;
  order_ref?: OrdersResponse;
  related_shipment?: ShipmentsResponse;
}>;

export type ExpandedTaskMessageResponse = TaskMessagesResponse<{
  sender: UsersResponse;
  read_by: UsersResponse[];
}>;

export const getTasks = (page: number, perPage: number, filter?: string) =>
  queryOptions({
    queryKey: ['tasks', page, perPage, filter],
    queryFn: () =>
      pb.collection('tasks').getList<ExpandedTaskResponse>(page, perPage, {
        expand: 'assignees,assigner,department,order_ref,related_shipment',
        filter,
      }),
    enabled: !!page && !!perPage,
    placeholderData: keepPreviousData,
  });

export const getTask = (id: string) =>
  queryOptions({
    queryKey: ['tasks', id],
    queryFn: () =>
      pb.collection('tasks').getOne<ExpandedTaskResponse>(id, {
        expand: 'assignees,assigner,department,order_ref,related_shipment',
      }),
  });

export const useMutateUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Omit<UpdateRecord<TasksRecord>, 'attachments' | 'assignees'> & {
        'assignees+'?: string[];
        'assignees-'?: string[];
      };
    }) => pb.collection('tasks').update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useMutateAddTaskAttachments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, attachments }: { id: string; attachments: File[] }) =>
      pb.collection('tasks').update(id, { 'attachments+': attachments }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useMutateRemoveTaskTattachments = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, attachments }: { id: string; attachments: string[] }) =>
      pb.collection('tasks').update(id, { 'attachments-': attachments }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useMutateCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: Omit<InsertRecord<TasksRecord>, 'attachments'> & {
        attachments?: File[];
      },
    ) => pb.collection('tasks').create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useMutateRemoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pb.collection('tasks').delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
