import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useQueries } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Route } from '.';
import { pb } from '../../../../lib/pocketbase';
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
import {
  useMutateUpdateRecord,
  viewRecordsQuery as viewRecordQuery,
} from '../../../queries';
import { closeDialogButtonRef } from '../../../../lib/utils';
import { useEffect } from 'react';
import { useFiles } from '../../../hooks/useFile';

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
        queryKey: ['users', searchQuery.id],
        queryFn: () => pb.collection('users').getFullList(),
      },
      {
        queryKey: ['departments', searchQuery.id],
        queryFn: () => pb.collection('departments').getFullList(),
      },
      {
        queryKey: ['orders', searchQuery.id],
        queryFn: () => pb.collection('orders').getFullList(),
      },
      {
        queryKey: ['shipments', searchQuery.id],
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

  const attachmentFiles = useFiles(
    task.data?.attachments.map(
      (file) => `/api/files/tasks/${searchQuery.id}/${file}`,
    ) || [],
  );

  const form = useAppForm({
    defaultValues: {
      title: task.data?.title,
      description: task.data?.description ? task.data.description : '',
      status: task.data?.status ? task.data.status : TasksStatusOptions.todo,
      assignees: task.data?.assignees ?? [],
      assigner: pb.authStore.record?.id ?? '',
      department: task.data?.department ?? '',
      priority: task.data?.priority ?? TasksPriorityOptions.medium,
      orderRef: task.data?.orderRef ?? '',
      relatedShipment: task.data?.relatedShipment ?? '',
      tags: task.data?.tags ?? TasksTagsOptions['customer-update'],
      dueDate: task.data?.dueDate
        ? new Date(Date.parse(task.data.dueDate))
        : undefined,
      attachments: attachmentFiles.data || [],
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

  if (
    !task.data ||
    !users.data ||
    !orders.data ||
    !shipments.data ||
    !departments.data ||
    !attachmentFiles.data
  ) {
    return (
      <Dialog open>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={searchQuery.editTask}>
      <DialogContent
        ref={(e) =>
          closeDialogButtonRef(e, () => {
            navigate({
              search: (prev) => ({
                ...prev,
                editTask: undefined,
                id: undefined,
              }),
            });
          })
        }
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
                  labelProps={{
                    htmlFor: 'description',
                    children: 'Description',
                  }}
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
                  selectProps={{
                    defaultValue: task.data.status,
                  }}
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
                  selectProps={{
                    defaultValue: task.data.priority,
                  }}
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
                  selectProps={{
                    defaultValue: task.data.tags,
                  }}
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
                  selectProps={{
                    defaultValue: task.data.department,
                  }}
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
                  multiSelectProps={{ defaultValue: task.data.assignees }}
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
                  selectProps={{
                    defaultValue: task.data.orderRef,
                  }}
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
                  selectProps={{
                    defaultValue: task.data.relatedShipment,
                  }}
                />
              )}
            </form.AppField>
            <form.AppField name="attachments">
              {(field) => (
                <field.FileUploadField
                  labelProps={{
                    htmlFor: 'attachments',
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
    </Dialog>
  );
};

export default EditTaskForm;
