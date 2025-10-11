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
import { createCompany } from '@/queries/crm';
import { crmCompanyInsertSchema } from '@/schemas/crm/companies';
import { ORPCInputs } from '@/orpc/client';

const NewCompanyFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });
  const { orpcClient, queryClient } = useRouteContext({
    from: '/dashboard/crm/companies/',
  });

  const createMutation = useMutation(createCompany, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createCompany'],
    validators: {
      onChange: crmCompanyInsertSchema,
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
          <DialogTitle>Create New Company</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new company record.
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
                <FieldLegend>Basic Information</FieldLegend>
                <FieldDescription>
                  Provide the fundamental details about the company.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="name">
                    {(field) => (
                      <field.TextField
                        label="Name"
                        description="The official name of the company."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="ownerId">
                    {(field) => (
                      <field.TextField
                        hidden
                        label="Owner ID"
                        description="The ID of the user who owns this company record."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="industry">
                    {(field) => (
                      <field.TextField
                        label="Industry"
                        description="The industry the company operates in."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="website">
                    {(field) => (
                      <field.TextField
                        label="Website"
                        description="The company's official website."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Contact Information</FieldLegend>
                <FieldDescription>
                  Enter the primary contact details for the company.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="phoneNumber">
                    {(field) => (
                      <field.TextField
                        label="Phone Number"
                        description="The primary phone number of the company."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Address Information</FieldLegend>
                <FieldDescription>
                  Provide the physical address of the company.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="street">
                    {(field) => (
                      <field.TextField
                        label="Street"
                        description="The street address of the company."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="city">
                    {(field) => (
                      <field.TextField
                        label="City"
                        description="The city where the company is located."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="state">
                    {(field) => (
                      <field.TextField
                        label="State"
                        description="The state or province where the company is located."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="postalCode">
                    {(field) => (
                      <field.TextField
                        label="Postal Code"
                        description="The postal code of the company's location."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="country">
                    {(field) => (
                      <field.TextField
                        label="Country"
                        description="The country where the company is located."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldGroup>
                <FieldSet>
                  <FieldLegend>Financial Information</FieldLegend>
                  <FieldDescription>
                    Details regarding the company's financial status.
                  </FieldDescription>
                  <FieldGroup>
                    <form.AppField name="annualRevenue">
                      {(field) => (
                        <field.NumberField
                          label="Annual Revenue"
                          description="The company's annual revenue."
                        />
                      )}
                    </form.AppField>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
              <form.SubmitButton>Create Company</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyFormDialog;
