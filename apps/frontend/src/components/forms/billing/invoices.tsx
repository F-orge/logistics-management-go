import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateBillingInvoiceInputSchema,
  UpdateBillingInvoiceInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createBillingInvoiceSchema = CreateBillingInvoiceInputSchema();
export const updateBillingInvoiceSchema = UpdateBillingInvoiceInputSchema();

export const createBillingInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createBillingInvoiceSchema>,
});

export const updateBillingInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateBillingInvoiceSchema>,
});

export const CreateBillingInvoiceForm = withForm({
  ...createBillingInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Billing Invoice</FieldLegend>
        <FieldDescription>
          Fill in the details for the new billing invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quoteId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="amountPaid">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="taxAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="discountAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="subtotal">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="paymentTerms">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sentAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="paidAt">
              {(field) => <field.InputField type="datetime-local" />}
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

export const UpdateBillingInvoiceForm = withForm({
  ...updateBillingInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Billing Invoice</FieldLegend>
        <FieldDescription>
          Update the details for the billing invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quoteId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="invoiceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="amountPaid">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="taxAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="discountAmount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="subtotal">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="paymentTerms">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sentAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="paidAt">
              {(field) => <field.InputField type="datetime-local" />}
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
