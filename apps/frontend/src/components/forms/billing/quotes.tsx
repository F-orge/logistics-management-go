import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateQuoteInputSchema,
  UpdateQuoteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createQuoteSchema = CreateQuoteInputSchema();
export const updateQuoteSchema = UpdateQuoteInputSchema();

export const createQuoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createQuoteSchema>,
});

export const updateQuoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateQuoteSchema>,
});

export const CreateQuoteForm = withForm({
  ...createQuoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Quote</FieldLegend>
        <FieldDescription>
          Fill in the details for the new quote.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Quote Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="originDetails">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationDetails">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="quotedPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="serviceLevel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiresAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quoteNumber">
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

export const UpdateQuoteForm = withForm({
  ...updateQuoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Quote</FieldLegend>
        <FieldDescription>
          Update the details for the quote.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Quote Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="originDetails">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationDetails">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="quotedPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="serviceLevel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiresAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quoteNumber">
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
