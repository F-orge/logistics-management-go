import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDisputeInputSchema,
  UpdateDisputeInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDisputeSchema = CreateDisputeInputSchema();
export const updateDisputeSchema = UpdateDisputeInputSchema();

export const createDisputeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDisputeSchema>,
});

export const updateDisputeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDisputeSchema>,
});

export const CreateDisputeForm = withForm({
  ...createDisputeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Dispute</FieldLegend>
        <FieldDescription>
          Fill in the details for the new dispute.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Dispute Details</FieldLegend>
            <form.AppField name="lineItemId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="disputedAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="resolutionNotes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="submittedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="resolvedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="resolvedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDisputeForm = withForm({
  ...updateDisputeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Dispute</FieldLegend>
        <FieldDescription>
          Update the details for the dispute.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Dispute Details</FieldLegend>
            <form.AppField name="lineItemId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="disputedAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="resolutionNotes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="submittedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="resolvedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="resolvedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
