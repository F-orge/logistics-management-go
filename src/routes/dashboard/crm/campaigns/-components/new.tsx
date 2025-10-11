import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { useAppForm } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { createCampaign } from '@/queries/crm/campaigns';
import { crmCampaignInsertSchema } from '@/schemas/crm/campaigns';

const NewCampaignFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/campaigns' });
  const searchQuery = useSearch({ from: '/dashboard/crm/campaigns/' });
  const { orpcClient } = useRouteContext({ from: '/dashboard/crm/campaigns/' });

  const createMutation = useMutation(createCampaign);

  const form = useAppForm({
    defaultValues: {} as Parameters<typeof orpcClient.crm.createCampaign>[0],
    validators: {
      onChange: crmCampaignInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () =>
          navigate({ search: (prev) => ({ ...prev, new: undefined }) }),
      }),
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Campaign Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the campaign.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Campaign Name"
                        description="The name of the marketing campaign."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="budget">
                    {(field) => (
                      <field.NumberField
                        label="Budget"
                        description="The allocated budget for the campaign."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="startDate">
                    {(field) => (
                      <field.DateField
                        label="Start Date"
                        description="The start date of the campaign."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="endDate">
                    {(field) => (
                      <field.DateField
                        label="End Date"
                        description="The end date of the campaign."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Campaign</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCampaignFormDialog;
