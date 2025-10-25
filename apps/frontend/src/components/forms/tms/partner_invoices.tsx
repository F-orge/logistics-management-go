import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePartnerInvoiceInputSchema,
  UpdatePartnerInvoiceInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPartnerInvoiceSchema = CreatePartnerInvoiceInputSchema();
export const updatePartnerInvoiceSchema = UpdatePartnerInvoiceInputSchema();

export const createPartnerInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPartnerInvoiceSchema>,
});

export const updatePartnerInvoiceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePartnerInvoiceSchema>,
});

export const CreatePartnerInvoiceForm = withForm({
  ...createPartnerInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Partner Invoice</FieldLegend>
        <FieldDescription>Fill in the details for the new partner invoice.</FieldDescription>
        <FieldGroup>
          {/* Invoice Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Information</FieldLegend>
            <FieldDescription>Invoice number and date.</FieldDescription>
            <FieldGroup>
              <form.AppField name="invoiceNumber">
                {(field) => (
                  <field.InputField
                    label="Invoice Number *"
                    description="Unique invoice number from the partner."
                    placeholder="e.g., INV-2024-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="invoiceDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Invoice Date *"
                    description="Date the invoice was issued."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Financial Section */}
          <FieldSet>
            <FieldLegend variant="label">Financial</FieldLegend>
            <FieldDescription>Total amount and payment status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="totalAmount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Total Amount *"
                    description="Total invoice amount."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Payment status of the invoice."
                    placeholder="e.g., Pending, Paid, Overdue"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link invoice to a carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier *"
                    description="The carrier/partner this invoice is from."
                    placeholder="Carrier ID"
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

export const UpdatePartnerInvoiceForm = withForm({
  ...updatePartnerInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Partner Invoice</FieldLegend>
        <FieldDescription>Update the details for the partner invoice.</FieldDescription>
        <FieldGroup>
          {/* Invoice Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Information</FieldLegend>
            <FieldDescription>Update invoice number and date.</FieldDescription>
            <FieldGroup>
              <form.AppField name="invoiceNumber">
                {(field) => (
                  <field.InputField
                    label="Invoice Number"
                    description="Unique invoice number from the partner."
                    placeholder="e.g., INV-2024-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="invoiceDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Invoice Date"
                    description="Date the invoice was issued."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Financial Section */}
          <FieldSet>
            <FieldLegend variant="label">Financial</FieldLegend>
            <FieldDescription>Update total amount and payment status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="totalAmount">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Total Amount"
                    description="Total invoice amount."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Payment status of the invoice."
                    placeholder="e.g., Pending, Paid, Overdue"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update carrier association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier"
                    description="The carrier/partner this invoice is from."
                    placeholder="Carrier ID"
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
