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
import { tmsCarrierInsertSchema } from '@/schemas/tms/carrier';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createCarrier } from '@/queries/tms';

const NewCarrierFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/carrier',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/carrier/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/carrier/',
  });

  const createMutation = useMutation(createCarrier, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Carrier</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new carrier record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsCarrierInsertSchema)}
          onSubmit={async (value: z.infer<typeof tmsCarrierInsertSchema>) => {
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

export default NewCarrierFormDialog;
