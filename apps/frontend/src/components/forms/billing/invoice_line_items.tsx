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
  SearchBillingInvoicesQuery,
  execute,
} from "@packages/graphql/client";
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
        <FieldDescription>Add line item to invoice.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link line item to invoice and source record.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchBillingInvoicesQuery,
                          { search: query || "" }
                        );
                        return data?.billing?.billingInvoices || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Invoice *"
                      description="Invoice for this line item."
                      placeholder="Search invoice..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceRecordId">
                  {(field) => (
                    <field.InputField
                      label="Source Record ID"
                      description="ID of source record (shipment, service, etc)."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="sourceRecordType">
                {(field) => (
                  <field.InputField
                    label="Source Record Type"
                    description="Type of source record."
                    placeholder="e.g., Shipment, Service, Labor"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Description and quantity information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description *"
                    description="Item description."
                    placeholder="e.g., Standard Shipping, Processing Fee"
                  />
                )}
              </form.AppField>
              <form.AppField name="quantity">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity *"
                    description="Item quantity."
                    placeholder="1"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Unit price and rate information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="unitPrice">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Unit Price *"
                      description="Price per unit."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="taxRate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Tax Rate"
                      description="Tax rate percentage (0-100)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="discountRate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Discount Rate"
                    description="Discount percentage (0-100)."
                    placeholder="0.00"
                    step="any"
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

export const UpdateInvoiceLineItemForm = withForm({
  ...updateInvoiceLineItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice Line Item</FieldLegend>
        <FieldDescription>Update line item details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update invoice and source record associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchBillingInvoicesQuery,
                          { search: query || "" }
                        );
                        return data?.billing?.billingInvoices || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Invoice"
                      description="Invoice for this line item."
                      placeholder="Search invoice..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceRecordId">
                  {(field) => (
                    <field.InputField
                      label="Source Record ID"
                      description="ID of source record."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="sourceRecordType">
                {(field) => (
                  <field.InputField
                    label="Source Record Type"
                    description="Type of source record."
                    placeholder="e.g., Shipment, Service, Labor"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Update description and quantity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Item description."
                    placeholder="e.g., Standard Shipping, Fee"
                  />
                )}
              </form.AppField>
              <form.AppField name="quantity">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity"
                    description="Item quantity."
                    placeholder="1"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Update pricing and rates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="unitPrice">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Unit Price"
                      description="Price per unit."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="taxRate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Tax Rate"
                      description="Tax rate percentage."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="discountRate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Discount Rate"
                    description="Discount percentage."
                    placeholder="0.00"
                    step="any"
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
