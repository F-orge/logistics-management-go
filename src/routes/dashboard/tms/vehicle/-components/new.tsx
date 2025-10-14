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
import { createVehicle } from '@/queries/tms';
import { tmsVehicleInsertSchema } from '@/schemas/tms/vehicle';

const NewVehicleFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/vehicle',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/vehicle/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/vehicle/',
  });

  const createMutation = useMutation(createVehicle, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Vehicle</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new vehicle record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsVehicleInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsVehicleInsertSchema>) => {
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

export default NewVehicleFormDialog;
