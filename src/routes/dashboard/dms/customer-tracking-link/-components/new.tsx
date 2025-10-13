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
import { dmsCustomerTrackingLinkInsertSchema } from '@/schemas/dms/customer_tracking_link';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createCustomerTrackingLink } from '@/queries/dms';

const NewCustomerTrackingLinkFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/dms/customer-tracking-link',
  });
  const searchQuery = useSearch({
    from: '/dashboard/dms/customer-tracking-link/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/dms/customer-tracking-link/',
  });

  const createMutation = useMutation(
    createCustomerTrackingLink,
    queryClient,
  );

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Customer Tracking Link</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new customer tracking link
            record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(dmsCustomerTrackingLinkInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof dmsCustomerTrackingLinkInsertSchema>,
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

export default NewCustomerTrackingLinkFormDialog;
