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
import { createGeofence } from '@/queries/tms';
import { tmsGeofenceInsertSchema } from '@/schemas/tms/geofence';

const NewGeofenceFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/geofence',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/geofence/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/geofence/',
  });

  const createMutation = useMutation(createGeofence, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Geofence</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new geofence record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsGeofenceInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsGeofenceInsertSchema>) => {
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

export default NewGeofenceFormDialog;
