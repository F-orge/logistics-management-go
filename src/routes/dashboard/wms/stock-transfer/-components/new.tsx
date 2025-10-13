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
import { wmsStockTransferInsertSchema } from '@/schemas/wms/stock_transfer';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createStockTransfer } from '@/queries/wms';

const NewStockTransferFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/stock-transfer',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/stock-transfer/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/stock-transfer/',
  });

  const createMutation = useMutation(createStockTransfer, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Stock Transfer</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new stock transfer record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsStockTransferInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsStockTransferInsertSchema>) => {
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

export default NewStockTransferFormDialog;
