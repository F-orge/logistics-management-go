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
import { wmsProductInsertSchema } from '@/schemas/wms/product';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createProduct } from '@/queries/wms';

const NewProductFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/product',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/product/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/product/',
  });

  const createMutation = useMutation(createProduct, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new product record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsProductInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsProductInsertSchema>) => {
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

export default NewProductFormDialog;
