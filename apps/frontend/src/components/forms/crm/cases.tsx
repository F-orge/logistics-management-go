import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCaseInputSchema,
  UpdateCaseInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCaseSchema = CreateCaseInputSchema();
export const updateCaseSchema = UpdateCaseInputSchema();

export const createCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCaseSchema>,
});

export const updateCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCaseSchema>,
});

export const CreateCaseForm = withForm({
  ...createCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Case</FieldLegend>
        <FieldDescription>Fill in the details for the new case.</FieldDescription>
        <FieldGroup>
          {/* Case Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Case Details</FieldLegend>
            <FieldDescription>Basic case information and classification.</FieldDescription>
            <FieldGroup>
              <form.AppField name="caseNumber">
                {(field) => (
                  <field.InputField
                    label="Case Number"
                    description="Unique identifier for this case."
                    placeholder="e.g., CASE-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Category or type of the case."
                    placeholder="e.g., Bug, Feature Request"
                  />
                )}
              </form.AppField>
              <form.AppField name="priority">
                {(field) => (
                  <field.InputField
                    label="Priority *"
                    description="Urgency level of the case."
                    placeholder="e.g., High, Medium, Low"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the case."
                    placeholder="e.g., Open, In Progress, Closed"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed information about the case."
                    placeholder="Describe the case..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Assignment</FieldLegend>
            <FieldDescription>Link this case to contacts and assign ownership.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact"
                    description="The contact associated with this case."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Case Owner"
                    description="The person responsible for resolving this case."
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

export const UpdateCaseForm = withForm({
  ...updateCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Case</FieldLegend>
        <FieldDescription>Update the details for the case.</FieldDescription>
        <FieldGroup>
          {/* Case Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Case Details</FieldLegend>
            <FieldDescription>Basic case information and classification.</FieldDescription>
            <FieldGroup>
              <form.AppField name="caseNumber">
                {(field) => (
                  <field.InputField
                    label="Case Number"
                    description="Unique identifier for this case."
                    placeholder="e.g., CASE-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Category or type of the case."
                    placeholder="e.g., Bug, Feature Request"
                  />
                )}
              </form.AppField>
              <form.AppField name="priority">
                {(field) => (
                  <field.InputField
                    label="Priority"
                    description="Urgency level of the case."
                    placeholder="e.g., High, Medium, Low"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the case."
                    placeholder="e.g., Open, In Progress, Closed"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed information about the case."
                    placeholder="Describe the case..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Assignment</FieldLegend>
            <FieldDescription>Link this case to contacts and assign ownership.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact"
                    description="The contact associated with this case."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Case Owner"
                    description="The person responsible for resolving this case."
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
