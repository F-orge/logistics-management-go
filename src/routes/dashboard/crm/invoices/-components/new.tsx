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
import { createInvoice } from '@/queries/crm/invoices';
import { crmInvoiceInsertSchema } from '@/schemas/crm/invoices';

const NewInvoiceFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/invoices' });
  const searchQuery = useSearch({ from: '/dashboard/crm/invoices/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/invoices/' });

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
          schema={new ZodProvider(crmInvoiceInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmInvoiceInsertSchema>) => {
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
