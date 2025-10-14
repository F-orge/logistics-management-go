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
import { createInventoryAdjustment } from '@/queries/wms';
import { wmsInventoryAdjustmentInsertSchema } from '@/schemas/wms/inventory_adjustment';

const NewInventoryAdjustmentFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/inventory-adjustment',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/inventory-adjustment/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/inventory-adjustment/',
  });

  const createMutation = useMutation(createInventoryAdjustment, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory Adjustment</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new inventory adjustment
            record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsInventoryAdjustmentInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsInventoryAdjustmentInsertSchema>,
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

export default NewInventoryAdjustmentFormDialog;
