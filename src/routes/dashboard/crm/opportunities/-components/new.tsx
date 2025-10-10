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
import { createOpportunity } from '@/queries/crm/opportunities';
import { crmOpportunityInsertSchema } from '@/schemas/crm/opportunities';
import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db/types';

const NewOpportunityFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/opportunities' });
  const searchQuery = useSearch({ from: '/dashboard/crm/opportunities/' });
  const { orpcClient } = useRouteContext({ from: '/dashboard/crm/opportunities/' });

  const createMutation = useMutation(createOpportunity);

  const form = useAppForm({
    defaultValues: {} as Parameters<typeof orpcClient.crm.createOpportunity>[0],
    validators: {
      onChange: crmOpportunityInsertSchema,
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
          <DialogTitle>Create New Opportunity</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new opportunity record.
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
                <FieldLegend>Opportunity Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the opportunity.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Opportunity Name"
                        description="The name of the sales opportunity."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="ownerId">
                    {(field) => (
                      <field.TextField
                        label="Owner ID"
                        description="The ID of the user who owns this opportunity record."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="campaignId">
                    {(field) => (
                      <field.TextField
                        label="Campaign ID"
                        description="The ID of the campaign associated with this opportunity."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="companyId">
                    {(field) => (
                      <field.TextField
                        label="Company ID"
                        description="The ID of the company associated with this opportunity."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="contactId">
                    {(field) => (
                      <field.TextField
                        label="Contact ID"
                        description="The ID of the contact associated with this opportunity."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="dealValue">
                    {(field) => (
                      <field.NumberField
                        label="Deal Value"
                        description="The estimated value of the deal."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="expectedCloseDate">
                    {(field) => (
                      <field.DateField
                        label="Expected Close Date"
                        description="The anticipated date for closing the opportunity."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="lostReason">
                    {(field) => (
                      <field.TextAreaField
                        label="Lost Reason"
                        description="The reason why the opportunity was lost (if applicable)."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="probability">
                    {(field) => (
                      <field.NumberField
                        label="Probability"
                        description="The probability of closing the opportunity (0-100%)."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="source">
                    {(field) => (
                      <field.SelectField
                        label="Source"
                        description="The source of the opportunity."
                        options={Object.values(CrmOpportunitySource).map((source) => ({
                          label: source,
                          value: source,
                        }))}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="stage">
                    {(field) => (
                      <field.SelectField
                        label="Stage"
                        description="The current stage of the opportunity."
                        options={Object.values(CrmOpportunityStage).map((stage) => ({
                          label: stage,
                          value: stage,
                        }))}
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Opportunity</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewOpportunityFormDialog;
