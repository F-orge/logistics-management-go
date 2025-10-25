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
        <FieldDescription>
          Fill in the details for the new interaction.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Interaction Details</FieldLegend>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="caseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="outcome">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="interactionDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the interaction.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Interaction Details</FieldLegend>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="caseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="outcome">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="interactionDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
