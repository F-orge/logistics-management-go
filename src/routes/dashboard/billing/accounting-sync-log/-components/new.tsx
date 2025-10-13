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
import { billingAccountingSyncLogInsertSchema } from '@/schemas/billing/accounting_sync_log';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';
import { createAccountingSyncLog } from '@/queries/billing';

const NewAccountingSyncLogFormDialog = () => {
  const navigate = useNavigate({
    from: '/dashboard/billing/accounting-sync-log',
  });
  const searchQuery = useSearch({
    from: '/dashboard/billing/accounting-sync-log/',
  });
  const { queryClient } = useRouteContext({
    from: '/dashboard/billing/accounting-sync-log/',
  });

  const createMutation = useMutation(createAccountingSyncLog, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Accounting Sync Log</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new accounting sync log
            record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(billingAccountingSyncLogInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof billingAccountingSyncLogInsertSchema>,
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

export default NewAccountingSyncLogFormDialog;
