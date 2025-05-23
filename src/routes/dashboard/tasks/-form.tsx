import { z } from 'zod';
import { withForm } from '../../../components/form';
import {
  TasksPriorityOptions,
  TasksStatusOptions,
  TasksTagsOptions,
} from '../../../../lib/pocketbase.gen';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@marahuyo/react-ui/ui/dialog';
import { formOptions } from '@tanstack/react-form';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { pb } from '../../../../lib/pocketbase';
import { ClientResponseError } from 'pocketbase';
import { toast } from 'sonner';

const TaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.nativeEnum(TasksStatusOptions),
  assignees: z.array(z.string()),
  assigner: z.string(),
  attachments: z.array(z.any()),
  department: z.string(),
  dueDate: z.date(),
  priority: z.nativeEnum(TasksPriorityOptions),
  tags: z.nativeEnum(TasksTagsOptions),
  kanbanOrder: z.number(),
  orderRef: z.string(),
  relatedShipment: z.string(),
});

export const CreateTaskFormOptions = formOptions({
  defaultValues: {
    assignees: [],
    assigner: pb.authStore.record?.id || '',
    attachments: [],
    department: '',
    description: '',
    kanbanOrder: 0,
    orderRef: '',
    priority: TasksPriorityOptions.medium,
    relatedShipment: '',
    tags: TasksTagsOptions['customer-update'],
    title: '',
    status: TasksStatusOptions.todo,
    dueDate: new Date(),
  } as z.infer<typeof TaskSchema>,
  validators: {
    onChange: TaskSchema,
  },
  onSubmit: async ({ value }) => {
    console.log(value);
    try {
      await pb.collection('tasks').create(value);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        toast(`Error ${e.status}`, { description: e.message });
      }
    }
  },
});

export const CreateTaskForm = withForm({
  ...CreateTaskFormOptions,
  render: function Render({ form }) {
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
      <DialogContent className="!max-w-3/4">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>Create a new task</DialogDescription>
        </DialogHeader>
        <form.AppForm>
          <form
            className="grid grid-cols-4 gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.AppField name="title">
              {(field) => (
                <field.TextInputField
                  labelProps={{ children: 'Title' }}
                  containerProps={{ className: 'col-span-4' }}
                />
              )}
            </form.AppField>
            <form.AppField name="description">
              {(field) => (
                <field.TextAreaInputField
                  labelProps={{ children: 'Description' }}
                  containerProps={{ className: 'col-span-4' }}
                />
              )}
            </form.AppField>
            <form.AppField name="status">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Status' }}
                  containerProps={{ className: 'col-span-1' }}
                  options={Object.keys(TasksStatusOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  placeHolder="Default: todo"
                />
              )}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Priority' }}
                  containerProps={{ className: 'col-span-1' }}
                  options={Object.keys(TasksPriorityOptions).map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  placeHolder="Default: medium"
                />
              )}
            </form.AppField>
            <form.AppField name="assignees">
              {(field) => (
                <field.MultiSelectField
                  labelProps={{ children: 'Assignees' }}
                  containerProps={{ className: 'col-span-2' }}
                  options={
                    users.data?.map((option) => ({
                      label: option.name,
                      value: option.id,
                    })) || []
                  }
                  placeHolder="Assign employees"
                />
              )}
            </form.AppField>
            <form.AppField name="department">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Department' }}
                  containerProps={{ className: 'col-span-4' }}
                  options={
                    departments.data?.map((option) => ({
                      label: option.name,
                      value: option.id,
                    })) || []
                  }
                  placeHolder="Select department"
                />
              )}
            </form.AppField>
            <form.AppField name="orderRef">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Order Ref #' }}
                  containerProps={{ className: 'col-span-1' }}
                  options={
                    orders.data?.map((option) => ({
                      label: option.order_id_custom,
                      value: option.id,
                    })) || []
                  }
                  placeHolder="Default: medium"
                />
              )}
            </form.AppField>
            <form.AppField name="relatedShipment">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Related shipment' }}
                  containerProps={{ className: 'col-span-1' }}
                  options={
                    shipments.data?.map((option) => ({
                      label: option.tracking_number,
                      value: option.id,
                    })) || []
                  }
                  placeHolder="Default: medium"
                />
              )}
            </form.AppField>
            <form.AppField name="tags">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Tags' }}
                  containerProps={{ className: 'col-span-2' }}
                  options={
                    Object.keys(TasksTagsOptions)?.map((option) => ({
                      label: option,
                      value: option,
                    })) || []
                  }
                  placeHolder="Default: medium"
                />
              )}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => (
                <field.DateInputField
                  labelProps={{ children: 'Due Date' }}
                  containerProps={{ className: 'col-span-4' }}
                />
              )}
            </form.AppField>
            <form.SubscribeButton
              buttonProps={{
                type: 'submit',
                className: 'col-span-4',
                children: 'Create Task',
              }}
            />
          </form>
        </form.AppForm>
      </DialogContent>
    );
  },
});
