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
import { wmsLocationInsertSchema } from '@/schemas/wms/location';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createLocation } from '@/queries/wms';

const NewLocationFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/wms/location',
  });
  const searchQuery = useSearch({
    from: '/dashboard/wms/location/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/wms/location/',
  });

  const createMutation = useMutation(createLocation, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Location</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new location record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(wmsLocationInsertSchema)}
          onSubmit={async (value: z.infer<typeof wmsLocationInsertSchema>) => {
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

export default NewLocationFormDialog;
