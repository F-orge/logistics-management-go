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
import { wmsSupplierInsertSchema } from '@/schemas/wms/supplier';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createSupplier } from '@/queries/wms';

const NewSupplierFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/supplier',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/supplier/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/supplier/',
  });

  const createMutation = useMutation(createSupplier, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Supplier</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new supplier record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsSupplierInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsSupplierInsertSchema>) => {
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

export default NewSupplierFormDialog;
