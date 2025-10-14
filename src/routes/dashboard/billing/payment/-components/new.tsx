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
import { createPayment } from '@/queries/billing';
import { billingPaymentInsertSchema } from '@/schemas/billing/payment';

const NewPaymentFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/payment',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/payment/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/payment/',
  });

  const createMutation = useMutation(createPayment, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Payment</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new payment record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingPaymentInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof billingPaymentInsertSchema>,
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

export default NewPaymentFormDialog;
