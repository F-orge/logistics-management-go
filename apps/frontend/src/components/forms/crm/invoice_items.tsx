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
        <FieldDescription>Fill in the details for the new invoice item.</FieldDescription>
        <FieldGroup>
          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Product and pricing information for this line item.</FieldDescription>
            <FieldGroup>
              <form.AppField name="productId">
                {(field) => (
                  <field.InputField
                    label="Product *"
                    description="The product for this invoice line item."
                    placeholder="Product ID"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity *"
                      description="Number of units."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="price">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Price *"
                      description="Unit price."
                      placeholder="0.00"
                      step="0.01"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this item to an invoice.</FieldDescription>
            <FieldGroup>
              <form.AppField name="invoiceId">
                {(field) => (
                  <field.InputField
                    label="Invoice *"
                    description="The invoice this item belongs to."
                    placeholder="Invoice ID"
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

export const UpdateInvoiceItemForm = withForm({
  ...updateInvoiceItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice Item</FieldLegend>
        <FieldDescription>Update the details for the invoice item.</FieldDescription>
        <FieldGroup>
          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Product and pricing information for this line item.</FieldDescription>
            <FieldGroup>
              <form.AppField name="productId">
                {(field) => (
                  <field.InputField
                    label="Product"
                    description="The product for this invoice line item."
                    placeholder="Product ID"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity"
                      description="Number of units."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="price">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Price"
                      description="Unit price."
                      placeholder="0.00"
                      step="0.01"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this item to an invoice.</FieldDescription>
            <FieldGroup>
              <form.AppField name="invoiceId">
                {(field) => (
                  <field.InputField
                    label="Invoice"
                    description="The invoice this item belongs to."
                    placeholder="Invoice ID"
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
