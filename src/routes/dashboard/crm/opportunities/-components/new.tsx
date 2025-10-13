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
import { createOpportunity } from '@/queries/crm/opportunities';
import { crmOpportunityInsertSchema } from '@/schemas/crm/opportunities';
import { ZodProvider } from '@autoform/zod';
import z from 'zod';

const NewOpportunityFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/opportunities' });
  const searchQuery = useSearch({ from: '/dashboard/crm/opportunities/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/opportunities/',
  });

  const createMutation = useMutation(createOpportunity, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Opportunity</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new opportunity record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmOpportunityInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof crmOpportunityInsertSchema>,
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

export default NewOpportunityFormDialog;
