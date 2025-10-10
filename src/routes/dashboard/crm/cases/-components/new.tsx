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
import { createCase } from '@/queries/crm/cases';
import { crmCaseInsertSchema } from '@/schemas/crm/cases';
import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { CrmCasePriority, CrmCaseStatus, CrmCaseType } from '@/db/types';

const NewCaseFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/cases' });
  const searchQuery = useSearch({ from: '/dashboard/crm/cases/' });
  const { orpcClient } = useRouteContext({ from: '/dashboard/crm/cases/' });

  const createMutation = useMutation(createCase);

  const form = useAppForm({
    defaultValues: {} as Parameters<typeof orpcClient.crm.createCase>[0],
    validators: {
      onChange: crmCaseInsertSchema,
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
          <DialogTitle>Create New Case</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new case record.
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
                <FieldLegend>Case Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the case.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="caseNumber">
                    {(field) => (
                      <field.TextField
                        label="Case Number"
                        description="The unique identifier for the case."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="ownerId">
                    {(field) => (
                      <field.TextField
                        label="Owner ID"
                        description="The ID of the user who owns this case record."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="contactId">
                    {(field) => (
                      <field.TextField
                        label="Contact ID"
                        description="The ID of the contact associated with this case."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="description">
                    {(field) => (
                      <field.TextAreaField
                        label="Description"
                        description="A detailed description of the case."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="priority">
                    {(field) => (
                      <field.SelectField
                        label="Priority"
                        description="The priority level of the case."
                        options={Object.values(CrmCasePriority).map((priority) => ({
                          label: priority,
                          value: priority,
                        }))}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="status">
                    {(field) => (
                      <field.SelectField
                        label="Status"
                        description="The current status of the case."
                        options={Object.values(CrmCaseStatus).map((status) => ({
                          label: status,
                          value: status,
                        }))}
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="type">
                    {(field) => (
                      <field.SelectField
                        label="Type"
                        description="The type of case."
                        options={Object.values(CrmCaseType).map((type) => ({
                          label: type,
                          value: type,
                        }))}
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Case</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseFormDialog;
