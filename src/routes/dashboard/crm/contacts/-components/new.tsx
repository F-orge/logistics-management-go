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
import { createContact } from '@/queries/crm/contacts';
import { crmContactInsertSchema } from '@/schemas/crm/contacts';
import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';

const NewContactFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/contacts' });
  const searchQuery = useSearch({ from: '/dashboard/crm/contacts/' });
  const { orpcClient } = useRouteContext({ from: '/dashboard/crm/contacts/' });

  const createMutation = useMutation(createContact);

  const form = useAppForm({
    defaultValues: {} as Parameters<typeof orpcClient.crm.createContact>[0],
    validators: {
      onChange: crmContactInsertSchema,
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
          <DialogTitle>Create New Contact</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new contact record.
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
                <FieldLegend>Contact Information</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the contact.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Name"
                        description="The full name of the contact."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="email">
                    {(field) => (
                      <field.TextField
                        label="Email"
                        description="The email address of the contact."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="phoneNumber">
                    {(field) => (
                      <field.TextField
                        label="Phone Number"
                        description="The primary phone number of the contact."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="jobTitle">
                    {(field) => (
                      <field.TextField
                        label="Job Title"
                        description="The job title of the contact."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="companyId">
                    {(field) => (
                      <field.TextField
                        label="Company ID"
                        description="The ID of the company this contact is associated with."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="ownerId">
                    {(field) => (
                      <field.TextField
                        label="Owner ID"
                        description="The ID of the user who owns this contact record."
                        required
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Contact</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactFormDialog;
