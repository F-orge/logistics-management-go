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
import { createWarehouse } from '@/queries/wms';
import { wmsWarehouseInsertSchema } from '@/schemas/wms/warehouse';

const NewWarehouseFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/warehouse',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/warehouse/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/warehouse/',
  });

  const createMutation = useMutation(createWarehouse, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Warehouse</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new warehouse record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsWarehouseInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsWarehouseInsertSchema>) => {
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

export default NewWarehouseFormDialog;
