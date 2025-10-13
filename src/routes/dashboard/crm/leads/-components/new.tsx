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
import { createLead } from '@/queries/crm/leads';
import { crmLeadInsertSchema } from '@/schemas/crm/leads';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';

const NewLeadFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/leads' });
  const searchQuery = useSearch({ from: '/dashboard/crm/leads/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/leads/' });

  const createMutation = useMutation(createLead, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new lead record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmLeadInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmLeadInsertSchema>) => {
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

export default NewLeadFormDialog;
