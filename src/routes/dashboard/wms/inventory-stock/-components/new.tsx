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
import { createInventoryStock } from '@/queries/wms';
import { wmsInventoryStockInsertSchema } from '@/schemas/wms/inventory_stock';

const NewInventoryStockFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/inventory-stock',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/inventory-stock/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/inventory-stock/',
  });

  const createMutation = useMutation(createInventoryStock, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory Stock</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new inventory stock record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsInventoryStockInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsInventoryStockInsertSchema>,
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

export default NewInventoryStockFormDialog;
