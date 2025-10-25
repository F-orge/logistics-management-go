import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateContactInputSchema,
  UpdateContactInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createContactSchema = CreateContactInputSchema();
export const updateContactSchema = UpdateContactInputSchema();

export const createContactFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createContactSchema>,
});

export const updateContactFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateContactSchema>,
});

export const CreateContactForm = withForm({
  ...createContactFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Contact</FieldLegend>
        <FieldDescription>
          Fill in the details for the new contact.
        </FieldDescription>
        <FieldGroup>
          {/* Personal Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Personal Details</FieldLegend>
            <FieldDescription>
              Contact's personal and professional information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Full Name *"
                    description="Contact's full name."
                    placeholder="e.g., John Doe"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email *"
                    description="Primary email address."
                    placeholder="john@example.com"
                  />
                )}
              </form.AppField>
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
              <form.AppField name="jobTitle">
                {(field) => (
                  <field.InputField
                    label="Job Title"
                    description="Contact's job title or position."
                    placeholder="e.g., Sales Manager"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this contact to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company"
                    description="The company this contact works for."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this contact."
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

export const UpdateContactForm = withForm({
  ...updateContactFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Contact</FieldLegend>
        <FieldDescription>Update the details for the contact.</FieldDescription>
        <FieldGroup>
          {/* Personal Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Personal Details</FieldLegend>
            <FieldDescription>
              Contact's personal and professional information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Full Name"
                    description="Contact's full name."
                    placeholder="e.g., John Doe"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Primary email address."
                    placeholder="john@example.com"
                  />
                )}
              </form.AppField>
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
              <form.AppField name="jobTitle">
                {(field) => (
                  <field.InputField
                    label="Job Title"
                    description="Contact's job title or position."
                    placeholder="e.g., Sales Manager"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this contact to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company"
                    description="The company this contact works for."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for managing this contact."
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
