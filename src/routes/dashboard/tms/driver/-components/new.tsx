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
import { tmsDriverInsertSchema } from '@/schemas/tms/driver';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createDriver } from '@/queries/tms';

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
