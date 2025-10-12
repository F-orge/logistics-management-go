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
import { ORPCInputs } from '@/orpc/client';
import { createCompany } from '@/queries/crm/companies';
import { crmCompanyInsertSchema } from '@/schemas/crm/companies';

const NewCompanyFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/companies' });
  const searchQuery = useSearch({ from: '/dashboard/crm/companies/' });
  const { queryClient } = useRouteContext({
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
                        label="Owner ID"
                        description="The ID of the company owner."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="annualRevenue">
                    {(field) => (
                      <field.NumberField
                        label="Annual Revenue"
                        description="The company's annual revenue."
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
                  <form.AppField name="phoneNumber">
                    {(field) => (
                      <field.TextField
                        label="Phone Number"
                        description="The company's contact phone number."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldLegend>Address Information</FieldLegend>
                <FieldDescription>
                  Provide the physical address details for the company.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="street">
                    {(field) => (
                      <field.TextField
                        label="Street"
                        description="Street address of the company."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="city">
                    {(field) => (
                      <field.TextField
                        label="City"
                        description="City where the company is located."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="state">
                    {(field) => (
                      <field.TextField
                        label="State"
                        description="State/Province where the company is located."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="postalCode">
                    {(field) => (
                      <field.TextField
                        label="Postal Code"
                        description="Postal code of the company's location."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="country">
                    {(field) => (
                      <field.TextField
                        label="Country"
                        description="Country where the company is located."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Company</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCompanyFormDialog;
