import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInvoiceInputSchema,
  UpdateInvoiceInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInvoiceSchema = CreateInvoiceInputSchema();
export const updateInvoiceSchema = UpdateInvoiceInputSchema();

export const createInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInvoiceSchema>,
});

export const updateInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInvoiceSchema>,
});

export const CreateInvoiceForm = withForm({
  ...createInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Invoice</FieldLegend>
        <FieldDescription>
          Fill in the details for the new invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="opportunityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="total">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="sentAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="paidAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="paymentMethod">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInvoiceForm = withForm({
  ...updateInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice</FieldLegend>
        <FieldDescription>
          Update the details for the invoice.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Details</FieldLegend>
            <form.AppField name="opportunityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="total">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="issueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="sentAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="paidAt">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="paymentMethod">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
