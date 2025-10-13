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
import { wmsTaskInsertSchema } from '@/schemas/wms/task';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createTask } from '@/queries/wms';

const NewTaskFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/task',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/task/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/task/',
  });

  const createMutation = useMutation(createTask, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsTaskInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsTaskInsertSchema>) => {
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

export default NewTaskFormDialog;
