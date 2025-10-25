import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInvoiceItemInputSchema,
  UpdateInvoiceItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInvoiceItemSchema = CreateInvoiceItemInputSchema();
export const updateInvoiceItemSchema = UpdateInvoiceItemInputSchema();

export const createInvoiceItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInvoiceItemSchema>,
});

export const updateInvoiceItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInvoiceItemSchema>,
});

export const CreateInvoiceItemForm = withForm({
  ...createInvoiceItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Invoice Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new invoice item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Item Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInvoiceItemForm = withForm({
  ...updateInvoiceItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice Item</FieldLegend>
        <FieldDescription>
          Update the details for the invoice item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Invoice Item Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
