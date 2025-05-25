import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Collections,
  type DepartmentsRecord,
  type OrdersResponse,
  type ShipmentsResponse,
  TasksPriorityOptions,
  type TasksResponse,
  TasksStatusOptions,
  TasksTagsOptions,
} from '../../../../lib/pocketbase.gen';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { pb } from '../../../../lib/pocketbase';
import { Route } from '.';
import { getTask } from '../../../queries/tasks';
import { useNavigate } from '@tanstack/react-router';
import {
  useMutateUpdateRecord,
  viewRecordsQuery as viewRecordQuery,
} from '../../../queries';

const EditTaskForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const taskMutation = useMutateUpdateRecord(
    Collections.Tasks,
    searchQuery.id || '',
  );

  const [users, departments, orders, shipments, task] = useQueries({
    queries: [
      {
        queryKey: ['users'],
        queryFn: () => pb.collection('users').getFullList(),
      },
      {
        queryKey: ['departments'],
        queryFn: () => pb.collection('departments').getFullList(),
      },
      {
        queryKey: ['orders'],
        queryFn: () => pb.collection('orders').getFullList(),
      },
      {
        queryKey: ['shipments'],
        queryFn: () => pb.collection('shipments').getFullList(),
      },
      viewRecordQuery<
        TasksResponse<{
          department: DepartmentsRecord;
          orderRef?: OrdersResponse;
          relatedShipment?: ShipmentsResponse;
        }>
      >(Collections.Tasks, searchQuery.id || '', {
        expand: 'department,orderRef,relatedShipment',
      }),
    ],
  });

  const form = useAppForm({
    defaultValues: {
      title: task.data?.title ?? '',
      description: task.data?.description ?? '',
      status: task.data?.status ?? '',
      assignees: task.data?.assignees ?? [],
      assigner: pb.authStore.record?.id ?? '',
      department: task.data?.expand?.department?.id ?? '',
      priority: task.data?.priority ?? [],
      orderRef: task.data?.expand.orderRef?.id ?? '',
      relatedShipment: task.data?.expand.relatedShipment?.id ?? '',
      tags: task.data?.tags ?? '',
      dueDate: task.data?.dueDate
        ? new Date(Date.parse(task.data.dueDate))
        : undefined,
      attachments:
        task.data?.attachments?.map(
          (file) => `/api/files/tasks/${searchQuery.id}/${file}`,
        ) || [],
    },
    onSubmit: async ({ value }) =>
      taskMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({
            search: (prev) => ({ ...prev, editTask: undefined, id: undefined }),
          });
        },
      }),
  });

  if (task.isLoading) {
    return <DialogContent>Loading...</DialogContent>;
  }

  return (
    <DialogContent
      ref={(e) => {
        const closeBtn = e?.querySelector(
          'button > span.sr-only',
        )?.parentElement;
        closeBtn?.addEventListener('click', () => {
          navigate({
            search: (prev) => ({ ...prev, editTask: undefined, id: undefined }),
          });
        });
      }}
      className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
    >
      <DialogHeader>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogDescription>Edit current task</DialogDescription>
      </DialogHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid grid-cols-4 gap-5"
      >
        <form.AppForm>
          <form.AppField name="title">
            {(field) => (
              <field.TextInputField
                labelProps={{ htmlFor: 'title', children: 'Title' }}
                containerProps={{ className: 'col-span-4' }}
                inputProps={{ required: true }}
              />
            )}
          </form.AppField>
          <form.AppField name="description">
            {(field) => (
              <field.TextAreaInputField
                labelProps={{ htmlFor: 'description', children: 'Description' }}
                containerProps={{ className: 'col-span-4' }}
                textAreaProps={{ required: true }}
              />
            )}
          </form.AppField>
          <form.AppField name="status">
            {(field) => (
              <field.SingleSelectField
                labelProps={{ htmlFor: 'status', children: 'Status' }}
                containerProps={{ className: 'col-span-1' }}
                options={Object.keys(TasksStatusOptions).map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            )}
          </form.AppField>
          <form.AppField name="priority">
            {(field) => (
              <field.SingleSelectField
                labelProps={{ htmlFor: 'priority', children: 'Priority' }}
                containerProps={{ className: 'col-span-1' }}
                options={Object.keys(TasksPriorityOptions).map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            )}
          </form.AppField>
          <form.AppField name="dueDate">
            {(field) => (
              <field.SingleDateInputField
                labelProps={{ htmlFor: 'dueDate', children: 'Due date' }}
                containerProps={{ className: 'col-span-2' }}
              />
            )}
          </form.AppField>
          <form.AppField name="tags">
            {(field) => (
              <field.SingleSelectField
                labelProps={{ htmlFor: 'tags', children: 'Tags' }}
                containerProps={{ className: 'col-span-1' }}
                options={Object.keys(TasksTagsOptions).map((option) => ({
                  label: option,
                  value: option,
                }))}
              />
            )}
          </form.AppField>
          <form.AppField name="department">
            {(field) => (
              <field.SingleSelectField
                labelProps={{ htmlFor: 'priority', children: 'Department' }}
                containerProps={{ className: 'col-span-1' }}
                options={
                  departments.data?.map((department) => ({
                    label: department.name,
                    value: department.id,
                  })) || []
                }
              />
            )}
          </form.AppField>
          <form.AppField name="assignees">
            {(field) => (
              <field.MultiSelectField
                labelProps={{
                  htmlFor: 'assignees',
                  children: 'Assign employee',
                }}
                containerProps={{ className: 'col-span-2' }}
                options={
                  users.data?.map((user) => ({
                    label: user.name,
                    value: user.id,
                  })) || []
                }
              />
            )}
          </form.AppField>
          <form.AppField name="orderRef">
            {(field) => (
              <field.SingleSelectField
                labelProps={{
                  htmlFor: 'orderRef',
                  children: 'Reference Order',
                }}
                containerProps={{ className: 'col-span-2' }}
                options={
                  orders.data?.map((order) => ({
                    label: order.orderIdCustom,
                    value: order.id,
                  })) || []
                }
              />
            )}
          </form.AppField>
          <form.AppField name="relatedShipment">
            {(field) => (
              <field.SingleSelectField
                labelProps={{
                  htmlFor: 'shipmentRef',
                  children: 'Reference Shipment',
                }}
                containerProps={{ className: 'col-span-2' }}
                options={
                  shipments.data?.map((order) => ({
                    label: order.trackingNumber,
                    value: order.id,
                  })) || []
                }
              />
            )}
          </form.AppField>
          <form.AppField name="attachments">
            {(field) => (
              <field.FileUploadField
                labelProps={{
                  htmlFor: 'shipmentRef',
                  children: 'Attachments',
                }}
                containerProps={{ className: 'col-span-4' }}
                fileUploadProps={{ multiple: true }}
              />
            )}
          </form.AppField>
          <form.SubscribeButton
            buttonProps={{ className: 'col-span-4', children: 'Update Task' }}
          />
        </form.AppForm>
      </form>
    </DialogContent>
  );
};

export default EditTaskForm;
