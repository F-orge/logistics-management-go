import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import { CreateCompanyInputSchema } from "@packages/graphql/client/zod";
import z from "zod";

export const schema = CreateCompanyInputSchema();

export const companyFormOption = formOptions({
  defaultValues: {} as z.infer<typeof schema>,
});

export const CompanyForm = withForm({
  ...companyFormOption,
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
