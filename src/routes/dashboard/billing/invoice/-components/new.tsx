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
import { billingInvoiceInsertSchema } from '@/schemas/billing/invoice';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createInvoice } from '@/queries/billing';

const NewInvoiceFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/invoice',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/invoice/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/invoice/',
  });

  const createMutation = useMutation(createInvoice, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new invoice record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingInvoiceInsertSchema)}
          onSubmit={async (value: z.infer<typeof billingInvoiceInsertSchema>) => {
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

export default NewInvoiceFormDialog;
