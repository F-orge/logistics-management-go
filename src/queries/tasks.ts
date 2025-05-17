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

export class TaskRepository {
  private pb: TypedPocketBase;

  constructor(pb: TypedPocketBase) {
    this.pb = pb;
  }

  // task
  async getTasks(page: number, limit: number, filter?: string) {
    return await this.pb
      .collection('tasks')
      .getList<ExpandedTaskResponse>(page, limit, {
        expand: 'assignees,assigner,department,order_ref,related_shipment',
        filter,
      });
  }

  async getTask(id: string) {
    return await this.pb.collection('tasks').getOne<ExpandedTaskResponse>(id, {
      expand: 'assignees,assigner,department,order_ref,related_shipment',
    });
  }

  async createTask(
    payload: Omit<InsertRecord<TasksRecord>, 'attachments'> & {
      attachments?: File[];
    },
  ) {
    return await this.pb.collection('tasks').create(payload);
  }

  async uploadAttachments(id: string, payload: File[]) {
    return await this.pb.collection('tasks').update(id, {
      'attachments+': payload,
    });
  }

  async removeAttachments(id: string, payload: string[]) {
    return await this.pb.collection('tasks').update(id, {
      'attachments-': payload,
    });
  }

  getAttachmentLink(id: string, file: string) {
    return `/api/files/tasks/${id}/${file}`;
  }

  async updateTask(
    id: string,
    payload: Omit<UpdateRecord<TasksRecord>, 'attachments'>,
  ) {
    return await this.pb.collection('tasks').update(id, payload);
  }

  async removeTask(id: string) {
    return await this.pb.collection('tasks').delete(id);
  }

  // task messages
  async getMessages(taskId: string, page: number, limit: number) {
    return await this.pb
      .collection('taskMessages')
      .getList<ExpandedTaskMessageResponse>(page, limit, {
        filter: `task = '${taskId}'`,
        expand: 'sender,read_by',
      });
  }

  async sendMessage(
    payload: Omit<
      InsertRecord<TaskMessagesRecord>,
      'attachments' | 'read_by'
    > & { attachments: File[] },
  ) {
    return await this.pb.collection('taskMessages').create(payload);
  }
}

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

export const useMutateAddTaskAttachments = () =>
  useMutation({
    mutationFn: ({ id, attachments }: { id: string; attachments: File[] }) =>
      pb.collection('tasks').update(id, { 'attachments+': attachments }),
  });

export const useMutateRemoveTaskTattachments = () =>
  useMutation({
    mutationFn: ({ id, attachments }: { id: string; attachments: string[] }) =>
      pb.collection('tasks').update(id, { 'attachments-': attachments }),
  });

export const useMutateCreateTask = () =>
  useMutation({
    mutationFn: (
      payload: Omit<InsertRecord<TasksRecord>, 'attachments'> & {
        attachments?: File[];
      },
    ) => pb.collection('tasks').create(payload),
  });

export const useMutateRemoveTask = () =>
  useMutation({
    mutationFn: (id: string) => pb.collection('tasks').delete(id),
  });
