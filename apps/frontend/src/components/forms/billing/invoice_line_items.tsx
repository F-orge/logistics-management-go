import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInvoiceLineItemInputSchema,
  UpdateInvoiceLineItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInvoiceLineItemSchema = CreateInvoiceLineItemInputSchema();
export const updateInvoiceLineItemSchema = UpdateInvoiceLineItemInputSchema();

export const createInvoiceLineItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInvoiceLineItemSchema>,
});

export const updateInvoiceLineItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInvoiceLineItemSchema>,
});

export const CreateInvoiceLineItemForm = withForm({
  ...createInvoiceLineItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Invoice Line Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new invoice line item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Line Item Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="unitPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="taxRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="discountRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInvoiceLineItemForm = withForm({
  ...updateInvoiceLineItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice Line Item</FieldLegend>
        <FieldDescription>
          Update the details for the invoice line item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Line Item Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="unitPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="taxRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="discountRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
