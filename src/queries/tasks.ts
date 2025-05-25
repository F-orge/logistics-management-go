import {
  infiniteQueryOptions,
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
  TaskMessagesResponse,
  TasksRecord,
  TasksResponse,
  UsersResponse,
} from '../../lib/pocketbase.gen';

export type ExpandedTaskResponse = TasksResponse<{
  assignees?: UsersResponse[];
  assigner: UsersResponse;
  department?: DepartmentsResponse;
  orderRef?: OrdersResponse;
  relatedShipment?: ShipmentsResponse;
}>;

export type ExpandedTaskMessageResponse = TaskMessagesResponse<{
  sender: UsersResponse;
  readBy: UsersResponse[];
}>;

export const getTasks = (page: number, perPage: number, filter?: string) =>
  queryOptions({
    queryKey: ['tasks', page, perPage, filter],
    queryFn: () =>
      pb.collection('tasks').getList<ExpandedTaskResponse>(page, perPage, {
        expand: 'assignees,assigner,department,orderRef,relatedShipment',
        filter,
        fields: '*,description:excerpt(32,true)',
      }),
    enabled: !!page && !!perPage,
    placeholderData: keepPreviousData,
  });

export const getTask = (id: string) =>
  queryOptions({
    queryKey: ['tasks', id],
    queryFn: () =>
      pb.collection('tasks').getOne<ExpandedTaskResponse>(id, {
        expand: 'assignees,assigner,department,orderRef,relatedShipment',
      }),
  });

export const getTasksInfiniteQuery = (initialPage: number, perPage: number) =>
  infiniteQueryOptions({
    queryKey: ['tasks', initialPage, perPage],
    queryFn: ({ pageParam }) =>
      pb.collection('tasks').getList(pageParam, perPage, {
        expand: 'assignees,assigner,department,orderRef,relatedShipment',
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _) => lastPage.page + 1,
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
