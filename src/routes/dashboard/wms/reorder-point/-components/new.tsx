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
import { wmsReorderPointInsertSchema } from '@/schemas/wms/reorder_point';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createReorderPoint } from '@/queries/wms';

const NewReorderPointFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/reorder-point',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/reorder-point/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/reorder-point/',
  });

  const createMutation = useMutation(createReorderPoint, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Reorder Point</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new reorder point record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsReorderPointInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsReorderPointInsertSchema>) => {
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

export default NewReorderPointFormDialog;
