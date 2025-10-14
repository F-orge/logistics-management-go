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
import { createDispute } from '@/queries/billing';
import { billingDisputeInsertSchema } from '@/schemas/billing/dispute';

const NewDisputeFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/dispute',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/dispute/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/dispute/',
  });

  const createMutation = useMutation(createDispute, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Dispute</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new dispute record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingDisputeInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof billingDisputeInsertSchema>,
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

export default NewDisputeFormDialog;
