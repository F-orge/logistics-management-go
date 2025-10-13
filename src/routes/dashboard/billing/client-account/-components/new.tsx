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
import { billingClientAccountInsertSchema } from '@/schemas/billing/client_account';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createClientAccount } from '@/queries/billing';

const NewClientAccountFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/client-account',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/client-account/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/client-account/',
  });

  const createMutation = useMutation(createClientAccount, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Client Account</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new client account record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingClientAccountInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof billingClientAccountInsertSchema>,
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

export default NewClientAccountFormDialog;
