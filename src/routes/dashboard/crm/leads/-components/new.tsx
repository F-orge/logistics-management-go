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
import { CrmLeadSource, CrmLeadStatus } from '@/db/types';
import { ORPCInputs } from '@/orpc/client';
import { createLead } from '@/queries/crm/leads';
import { crmLeadInsertSchema } from '@/schemas/crm/leads';

const NewLeadFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/leads' });
  const searchQuery = useSearch({ from: '/dashboard/crm/leads/' });
  const { queryClient } = useRouteContext({ from: '/dashboard/crm/leads/' });

  const createMutation = useMutation(createLead, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createLead'],
    validators: {
      onChange: crmLeadInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, new: undefined }) });
        },
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
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new lead record.
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
                <FieldLegend>Lead Information</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the lead.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Lead Name"
                        description="The full name of the lead."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="email">
                    {(field) => (
                      <field.TextField
                        label="Email"
                        description="The email address of the lead."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="ownerId">
                    {(field) => (
                      <field.TextField
                        label="Owner ID"
                        description="The ID of the user who owns this lead record."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="campaignId">
                    {(field) => (
                      <field.TextField
                        label="Campaign ID"
                        description="The ID of the campaign this lead originated from."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="leadScore">
                    {(field) => (
                      <field.NumberField
                        label="Lead Score"
                        description="A numerical score indicating the lead's potential."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="leadSource">
                    {(field) => (
                      <field.SelectField
                        label="Lead Source"
                        description="The source from which the lead was acquired."
                        options={Object.values(CrmLeadSource).map((source) => ({
                          label: source,
                          value: source,
                        }))}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="status">
                    {(field) => (
                      <field.SelectField
                        label="Status"
                        description="The current status of the lead."
                        options={Object.values(CrmLeadStatus).map((status) => ({
                          label: status,
                          value: status,
                        }))}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="convertedAt">
                    {(field) => (
                      <field.DateField
                        label="Converted At"
                        description="The date and time when the lead was converted."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="convertedCompanyId">
                    {(field) => (
                      <field.TextField
                        label="Converted Company ID"
                        description="The ID of the company created from this converted lead."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="convertedContactId">
                    {(field) => (
                      <field.TextField
                        label="Converted Contact ID"
                        description="The ID of the contact created from this converted lead."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="convertedOpportunityId">
                    {(field) => (
                      <field.TextField
                        label="Converted Opportunity ID"
                        description="The ID of the opportunity created from this converted lead."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Lead</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadFormDialog;
