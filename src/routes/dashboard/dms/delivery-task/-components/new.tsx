import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { AutoForm } from '@/components/ui/autoform';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldSeparator } from '@/components/ui/field';
import { dmsDeliveryTaskInsertSchema } from '@/schemas/dms/delivery_task';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createDeliveryTask } from '@/queries/dms';

const NewDeliveryTaskFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/dms/delivery-task',
  });
  const searchQuery = useSearch({
    from: '/dashboard/dms/delivery-task/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/dms/delivery-task/',
  });

  const createMutation = useMutation(createDeliveryTask, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Delivery Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new delivery task record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(dmsDeliveryTaskInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof dmsDeliveryTaskInsertSchema>,
          ) => {
            await createMutation.mutateAsync(value, {
              onSuccess: () => {
                navigate({ search: (prev) => ({ ...prev, new: undefined }) });
              },
            });
          }}
          withSubmit
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewDeliveryTaskFormDialog;
