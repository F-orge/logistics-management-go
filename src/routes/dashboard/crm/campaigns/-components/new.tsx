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
import { createCampaign } from '@/queries/crm/campaigns';
import { crmCampaignInsertSchema } from '@/schemas/crm/campaigns';

const NewCampaignFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/campaigns' });
  const searchQuery = useSearch({ from: '/dashboard/crm/campaigns/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/campaigns/',
  });

  const createMutation = useMutation(createCampaign, queryClient);

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new campaign record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <AutoForm
          schema={new ZodProvider(crmCampaignInsertSchema)}
          onSubmit={async (value: z.infer<typeof crmCampaignInsertSchema>) => {
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

export default NewCampaignFormDialog;
