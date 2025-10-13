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
import { wmsPickBatchInsertSchema } from '@/schemas/wms/pick_batch';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createPickBatch } from '@/queries/wms';

const NewPickBatchFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/pick-batch',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/pick-batch/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/pick-batch/',
  });

  const createMutation = useMutation(createPickBatch, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Pick Batch</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new pick batch record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsPickBatchInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsPickBatchInsertSchema>) => {
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

export default NewPickBatchFormDialog;
