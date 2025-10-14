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
import { createDriver } from '@/queries/tms';
import { tmsDriverInsertSchema } from '@/schemas/tms/driver';

const NewDriverFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/driver',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/driver/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/driver/',
  });

  const createMutation = useMutation(createDriver, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Driver</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new driver record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsDriverInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsDriverInsertSchema>) => {
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

export default NewDriverFormDialog;
