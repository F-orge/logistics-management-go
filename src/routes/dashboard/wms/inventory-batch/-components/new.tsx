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
import { wmsInventoryBatchInsertSchema } from '@/schemas/wms/inventory_batch';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createInventoryBatch } from '@/queries/wms';

const NewInventoryBatchFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/inventory-batch',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/inventory-batch/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/inventory-batch/',
  });

  const createMutation = useMutation(createInventoryBatch, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory Batch</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new inventory batch record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsInventoryBatchInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsInventoryBatchInsertSchema>,
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

export default NewInventoryBatchFormDialog;
