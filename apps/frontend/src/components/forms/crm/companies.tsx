import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCompanyInputSchema,
  UpdateCompanyInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";
import { toast } from "sonner";
import {
  CreateCompanyMutation,
  execute,
  UpdateCompanyMutation,
} from "@packages/graphql/client";
import { Company } from "@/components/tables/crm/companies";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createCompanySchema = CreateCompanyInputSchema();
export const updateCompanySchema = UpdateCompanyInputSchema();

export const createCompanyFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCompanySchema>,
});

export const updateCompanyFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCompanySchema>,
});

export const CreateCompanyForm = withForm({
  ...createCompanyFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Company Information</FieldLegend>
        <FieldDescription>
          Create or update company details including basic information, address,
          and contact details.
        </FieldDescription>
        <FieldGroup>
          {/* Basic Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Basic Information</FieldLegend>
            <FieldDescription>
              Essential company details and classification.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Company Name *"
                    description="The legal name of the company."
                    placeholder="Enter company name"
                  />
                )}
              </form.AppField>
              <form.AppField name="industry">
                {(field) => (
                  <field.InputField
                    label="Industry"
                    description="The industry or sector the company operates in."
                    placeholder="e.g., Technology, Manufacturing"
                  />
                )}
              </form.AppField>
              <form.AppField name="annualRevenue">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Annual Revenue"
                    description="Estimated annual revenue amount."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Address Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Address Information</FieldLegend>
            <FieldDescription>
              Complete address details for the company.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="street">
                {(field) => (
                  <field.InputField
                    label="Street Address"
                    description="Street address."
                    placeholder="e.g., 123 Main Street"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="city">
                  {(field) => (
                    <field.InputField
                      label="City"
                      placeholder="e.g., San Francisco"
                    />
                  )}
                </form.AppField>
                <form.AppField name="state">
                  {(field) => (
                    <field.InputField label="State" placeholder="e.g., CA" />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="postalCode">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Postal Code"
                      placeholder="e.g., 94105"
                    />
                  )}
                </form.AppField>
                <form.AppField name="country">
                  {(field) => (
                    <field.InputField
                      label="Country"
                      placeholder="e.g., United States"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Contact & Management Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact & Management</FieldLegend>
            <FieldDescription>
              Contact information and account ownership.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="phoneNumber">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone Number"
                    description="Primary contact phone number."
                    placeholder="+1 (555) 123-4567"
                  />
                )}
              </form.AppField>
              <form.AppField name="website">
                {(field) => (
                  <field.InputField
                    type="url"
                    label="Website"
                    description="Company website URL."
                    placeholder="https://example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this company."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCompanyForm = withForm({
  ...updateCompanyFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Company Information</FieldLegend>
        <FieldDescription>
          Create or update company details including basic information, address,
          and contact details.
        </FieldDescription>
        <FieldGroup>
          {/* Basic Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Basic Information</FieldLegend>
            <FieldDescription>
              Essential company details and classification.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Company Name *"
                    description="The legal name of the company."
                    placeholder="Enter company name"
                  />
                )}
              </form.AppField>
              <form.AppField name="industry">
                {(field) => (
                  <field.InputField
                    label="Industry"
                    description="The industry or sector the company operates in."
                    placeholder="e.g., Technology, Manufacturing"
                  />
                )}
              </form.AppField>
              <form.AppField name="annualRevenue">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Annual Revenue"
                    description="Estimated annual revenue amount."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Address Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Address Information</FieldLegend>
            <FieldDescription>
              Complete address details for the company.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="street">
                {(field) => (
                  <field.InputField
                    label="Street Address"
                    description="Street address."
                    placeholder="e.g., 123 Main Street"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="city">
                  {(field) => (
                    <field.InputField
                      label="City"
                      placeholder="e.g., San Francisco"
                    />
                  )}
                </form.AppField>
                <form.AppField name="state">
                  {(field) => (
                    <field.InputField label="State" placeholder="e.g., CA" />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="postalCode">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Postal Code"
                      placeholder="e.g., 94105"
                    />
                  )}
                </form.AppField>
                <form.AppField name="country">
                  {(field) => (
                    <field.InputField
                      label="Country"
                      placeholder="e.g., United States"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Contact & Management Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact & Management</FieldLegend>
            <FieldDescription>
              Contact information and account ownership.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="phoneNumber">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone Number"
                    description="Primary contact phone number."
                    placeholder="+1 (555) 123-4567"
                  />
                )}
              </form.AppField>
              <form.AppField name="website">
                {(field) => (
                  <field.InputField
                    type="url"
                    label="Website"
                    description="Company website URL."
                    placeholder="https://example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this company."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewCompanyDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/companies" });
  const searchQuery = useSearch({ from: "/dashboard/crm/companies" });

  const form = useAppForm({
    ...createCompanyFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateCompanyMutation,
        { company: value }
      );

      if (data) {
        toast.success("Successfully created company");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateCompanyForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateCompanyDialogForm = ({ data }: { data: Company[] }) => {
  const navigate = useNavigate({ from: "/dashboard/crm/companies" });
  const searchQuery = useSearch({ from: "/dashboard/crm/companies" });

  const company = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateCompanyFormOption,
    defaultValues: company,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateCompanyMutation,
        { id: company.id, company: value as any }
      );

      if (data) {
        toast.success("Successfully updated company");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateCompanyForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
