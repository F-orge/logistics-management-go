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
import { tmsProofOfDeliveryInsertSchema } from '@/schemas/tms/proof_of_delivery';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createProofOfDelivery } from '@/queries/tms';

const NewProofOfDeliveryFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/proof-of-delivery',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/proof-of-delivery/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/proof-of-delivery/',
  });

  const createMutation = useMutation(createProofOfDelivery, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Proof Of Delivery</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new proof of delivery record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsProofOfDeliveryInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof tmsProofOfDeliveryInsertSchema>,
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

export default NewProofOfDeliveryFormDialog;
