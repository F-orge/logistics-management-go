import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInteractionInputSchema,
  UpdateInteractionInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInteractionSchema = CreateInteractionInputSchema();
export const updateInteractionSchema = UpdateInteractionInputSchema();

export const createInteractionFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInteractionSchema>,
});

export const updateInteractionFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInteractionSchema>,
});

export const CreateInteractionForm = withForm({
  ...createInteractionFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Interaction</FieldLegend>
        <FieldDescription>Fill in the details for the new interaction.</FieldDescription>
        <FieldGroup>
          {/* Interaction Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Interaction Details</FieldLegend>
            <FieldDescription>Basic interaction information and type.</FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Type of interaction (call, email, meeting, etc.)."
                    placeholder="e.g., Call, Email, Meeting"
                  />
                )}
              </form.AppField>
              <form.AppField name="interactionDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Interaction Date *"
                    description="When the interaction occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="outcome">
                {(field) => (
                  <field.InputField
                    label="Outcome"
                    description="Result or conclusion of the interaction."
                    placeholder="e.g., Positive, Neutral, Negative"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional details about the interaction."
                    placeholder="Details about the interaction..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this interaction to contacts and cases.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact *"
                    description="The contact involved in this interaction."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="caseId">
                {(field) => (
                  <field.InputField
                    label="Case"
                    description="Related case (optional)."
                    placeholder="Case ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User"
                    description="The user who recorded this interaction."
                    placeholder="User ID"
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

export const UpdateInteractionForm = withForm({
  ...updateInteractionFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Interaction</FieldLegend>
        <FieldDescription>Update the details for the interaction.</FieldDescription>
        <FieldGroup>
          {/* Interaction Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Interaction Details</FieldLegend>
            <FieldDescription>Basic interaction information and type.</FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Type of interaction (call, email, meeting, etc.)."
                    placeholder="e.g., Call, Email, Meeting"
                  />
                )}
              </form.AppField>
              <form.AppField name="interactionDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Interaction Date"
                    description="When the interaction occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="outcome">
                {(field) => (
                  <field.InputField
                    label="Outcome"
                    description="Result or conclusion of the interaction."
                    placeholder="e.g., Positive, Neutral, Negative"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional details about the interaction."
                    placeholder="Details about the interaction..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this interaction to contacts and cases.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact"
                    description="The contact involved in this interaction."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="caseId">
                {(field) => (
                  <field.InputField
                    label="Case"
                    description="Related case (optional)."
                    placeholder="Case ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User"
                    description="The user who recorded this interaction."
                    placeholder="User ID"
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
