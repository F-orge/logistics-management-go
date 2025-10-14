import { ZodProvider } from '@autoform/zod';
import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import z from 'zod';
import { AutoForm } from '@/components/ui/autoform';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FieldSeparator } from '@/components/ui/field';
import { createTaskEvent } from '@/queries/dms';
import { dmsTaskEventInsertSchema } from '@/schemas/dms/task_event';

const NewTaskEventFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/dms/task-event',
  });
  const searchQuery = useSearch({
    from: '/dashboard/dms/task-event/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/dms/task-event/',
  });

  const createMutation = useMutation(createTaskEvent, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task Event</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task event record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(dmsTaskEventInsertSchema)}
          onSubmit={async (value: z.infer<typeof dmsTaskEventInsertSchema>) => {
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

export default NewTaskEventFormDialog;
