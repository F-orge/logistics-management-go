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
import { createDriverLocation } from '@/queries/dms';
import { dmsDriverLocationInsertSchema } from '@/schemas/dms/driver_location';

const NewDriverLocationFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/dms/driver-location',
  });
  const searchQuery = useSearch({
    from: '/dashboard/dms/driver-location/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/dms/driver-location/',
  });

  const createMutation = useMutation(createDriverLocation, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Driver Location</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new driver location record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(dmsDriverLocationInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof dmsDriverLocationInsertSchema>,
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

export default NewDriverLocationFormDialog;
