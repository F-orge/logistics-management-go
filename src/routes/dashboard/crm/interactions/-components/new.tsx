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
import { createInteraction } from '@/queries/crm/interactions';
import { crmInteractionInsertSchema } from '@/schemas/crm/interactions';

const NewInteractionFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/interactions' });
  const searchQuery = useSearch({ from: '/dashboard/crm/interactions/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/interactions/',
  });

  const createMutation = useMutation(createInteraction, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Interaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new interaction record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmInteractionInsertSchema)}
          onSubmit={async (
            value: z.infer<typeof crmInteractionInsertSchema>,
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

export default NewInteractionFormDialog;
