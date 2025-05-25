import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { useAppForm } from '@marahuyo/react-ui/forms/index';
import {
  Collections,
  TasksPriorityOptions,
  TasksStatusOptions,
  TasksTagsOptions,
} from '../../../../lib/pocketbase.gen';
import { useQueries } from '@tanstack/react-query';
import { pb } from '../../../../lib/pocketbase';
import { useMutateCreateRecord } from '../../../queries';
import { Route } from '.';
import { useNavigate } from '@tanstack/react-router';

const CreateNewTaskForm = () => {
  const searchQuery = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const tasksMutation = useMutateCreateRecord(Collections.Tasks);

  const form = useAppForm({
    defaultValues: {
      title: '',
      description: '',
      status: '',
      assignees: [] as string[],
      assigner: pb.authStore.record?.id,
      department: '',
      priority: TasksPriorityOptions.medium,
      orderRef: '',
      relatedShipment: '',
      tags: TasksTagsOptions['customer-update'],
      dueDate: new Date(),
      attachments: [] as File[],
    },
    onSubmit: async ({ value }) => {
      await tasksMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, newTask: undefined }) });
        },
      });
    },
  });

  const [users, departments, orders, shipments] = useQueries({
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
    ],
  });

  return (
    <Dialog open={searchQuery.newTask}>
      <DialogContent
        ref={(el) => {
          const closeBtn = el?.querySelector(
            'button > span.sr-only',
          )?.parentElement;
          closeBtn?.addEventListener('click', () =>
            navigate({ search: (prev) => ({ ...prev, newTask: undefined }) }),
          );
        }}
        className="!max-w-3/4 max-h-3/4 overflow-y-auto no-scrollbar"
      >
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Create a new task</DialogDescription>
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
                    orders.data?.map((user) => ({
                      label: user.orderIdCustom,
                      value: user.id,
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
                    shipments.data?.map((user) => ({
                      label: user.trackingNumber,
                      value: user.id,
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
              buttonProps={{ className: 'col-span-4', children: 'Create Task' }}
            />
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewTaskForm;
