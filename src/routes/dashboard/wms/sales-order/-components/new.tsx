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
import { createSalesOrder } from '@/queries/wms';
import { wmsSalesOrderInsertSchema } from '@/schemas/wms/sales_order';

const NewSalesOrderFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/sales-order',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/sales-order/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/sales-order/',
  });

  const createMutation = useMutation(createSalesOrder, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Sales Order</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new sales order record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsSalesOrderInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof wmsSalesOrderInsertSchema>,
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

export default NewSalesOrderFormDialog;
