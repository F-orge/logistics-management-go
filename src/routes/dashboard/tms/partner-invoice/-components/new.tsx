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
import { createPartnerInvoice } from '@/queries/tms';
import { tmsPartnerInvoiceInsertSchema } from '@/schemas/tms/partner_invoice';

const NewPartnerInvoiceFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/tms/partner-invoice',
  });
  const searchQuery = useSearch({
    from: '/dashboard/tms/partner-invoice/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/tms/partner-invoice/',
  });

  const createMutation = useMutation(createPartnerInvoice, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Partner Invoice</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new partner invoice record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(tmsPartnerInvoiceInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof tmsPartnerInvoiceInsertSchema>,
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

export default NewPartnerInvoiceFormDialog;
