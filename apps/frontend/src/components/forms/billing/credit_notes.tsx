import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCreditNoteInputSchema,
  UpdateCreditNoteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCreditNoteSchema = CreateCreditNoteInputSchema();
export const updateCreditNoteSchema = UpdateCreditNoteInputSchema();

export const createCreditNoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCreditNoteSchema>,
});

export const updateCreditNoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCreditNoteSchema>,
});

export const CreateCreditNoteForm = withForm({
  ...createCreditNoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Credit Note</FieldLegend>
        <FieldDescription>
          Fill in the details for the new credit note.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Credit Note Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="disputeId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="creditNoteNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="appliedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="createdByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCreditNoteForm = withForm({
  ...updateCreditNoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Credit Note</FieldLegend>
        <FieldDescription>
          Update the details for the credit note.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Credit Note Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="disputeId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="creditNoteNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="appliedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="createdByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
