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
import { CrmInteractionType } from '@/db/types';
import { ORPCInputs } from '@/orpc/client';
import { createInteraction } from '@/queries/crm/interactions';
import { crmInteractionInsertSchema } from '@/schemas/crm/interactions';

const NewInteractionFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/interactions' });
  const searchQuery = useSearch({ from: '/dashboard/crm/interactions/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/interactions/',
  });

  const createMutation = useMutation(createInteraction, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createInteraction'],
    validators: {
      onChange: crmInteractionInsertSchema,
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
          <DialogTitle>Create New Interaction</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new interaction record.
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
                <FieldLegend>Interaction Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the interaction.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="contactId">
                    {(field) => (
                      <field.TextField
                        label="Contact ID"
                        description="The ID of the contact involved in this interaction."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="userId">
                    {(field) => (
                      <field.TextField
                        label="User ID"
                        description="The ID of the user who recorded this interaction."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="caseId">
                    {(field) => (
                      <field.TextField
                        label="Case ID"
                        description="The ID of the case associated with this interaction (optional)."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="type">
                    {(field) => (
                      <field.SelectField
                        label="Type"
                        description="The type of interaction."
                        options={Object.values(CrmInteractionType).map(
                          (type) => ({
                            label: type,
                            value: type,
                          }),
                        )}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="interactionDate">
                    {(field) => (
                      <field.DateField
                        label="Interaction Date"
                        description="The date and time when the interaction occurred."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="notes">
                    {(field) => (
                      <field.TextAreaField
                        label="Notes"
                        description="Detailed notes about the interaction."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="outcome">
                    {(field) => (
                      <field.TextField
                        label="Outcome"
                        description="The outcome or result of the interaction."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Interaction</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInteractionFormDialog;
