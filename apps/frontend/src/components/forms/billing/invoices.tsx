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
        <FieldDescription>Create a new billing invoice.</FieldDescription>
        <FieldGroup>
          {/* Invoice Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Identification</FieldLegend>
            <FieldDescription>Invoice number and basic information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceNumber">
                  {(field) => (
                    <field.InputField
                      label="Invoice Number *"
                      description="Unique invoice identifier."
                      placeholder="e.g., INV-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Invoice status."
                      placeholder="e.g., Draft, Sent, Paid"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link invoice to client and quote.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client *"
                      description="Client for this invoice."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quoteId">
                  {(field) => (
                    <field.InputField
                      label="Quote"
                      description="Associated quote (optional)."
                      placeholder="Quote ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="createdByUserId">
                {(field) => (
                  <field.InputField
                    label="Created By"
                    description="User who created invoice."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Dates</FieldLegend>
            <FieldDescription>Issue and due dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date *"
                      description="When invoice was issued."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="dueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Due Date *"
                      description="Payment due date."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Financial Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Financial Details</FieldLegend>
            <FieldDescription>Amounts and financial calculations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="subtotal">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Subtotal *"
                      description="Before tax and discounts."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="discountAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Discount Amount"
                      description="Total discount applied."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taxAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Tax Amount"
                      description="Total tax amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="totalAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Amount *"
                      description="Grand total."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amountPaid">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount Paid"
                      description="Amount paid so far."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency *"
                      description="Currency for invoice."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Terms & Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Terms & Timestamps</FieldLegend>
            <FieldDescription>Payment terms and key timestamps.</FieldDescription>
            <FieldGroup>
              <form.AppField name="paymentTerms">
                {(field) => (
                  <field.InputField
                    label="Payment Terms"
                    description="e.g., Net 30, Due Upon Receipt."
                    placeholder="Net 30"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sentAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Sent At"
                      description="When invoice was sent to client."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="paidAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Paid At"
                      description="When invoice was paid."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Notes</FieldLegend>
            <FieldDescription>Additional invoice notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Special terms, late fees, etc."
                    placeholder="Enter notes..."
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

export const UpdateBillingInvoiceForm = withForm({
  ...updateBillingInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Billing Invoice</FieldLegend>
        <FieldDescription>Update invoice details.</FieldDescription>
        <FieldGroup>
          {/* Invoice Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Identification</FieldLegend>
            <FieldDescription>Update invoice number and status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceNumber">
                  {(field) => (
                    <field.InputField
                      label="Invoice Number"
                      description="Invoice identifier."
                      placeholder="e.g., INV-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Invoice status."
                      placeholder="e.g., Draft, Sent, Paid"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update client and quote associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Client for this invoice."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quoteId">
                  {(field) => (
                    <field.InputField
                      label="Quote"
                      description="Associated quote."
                      placeholder="Quote ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="createdByUserId">
                {(field) => (
                  <field.InputField
                    label="Created By"
                    description="User who created invoice."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Dates</FieldLegend>
            <FieldDescription>Update issue and due dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date"
                      description="When invoice was issued."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="dueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Due Date"
                      description="Payment due date."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Financial Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Financial Details</FieldLegend>
            <FieldDescription>Update amounts and calculations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="subtotal">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Subtotal"
                      description="Before tax and discounts."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="discountAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Discount Amount"
                      description="Total discount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taxAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Tax Amount"
                      description="Total tax."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="totalAmount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Amount"
                      description="Grand total."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amountPaid">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount Paid"
                      description="Amount paid so far."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency"
                      description="Currency for invoice."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Terms & Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Terms & Timestamps</FieldLegend>
            <FieldDescription>Update payment terms and timestamps.</FieldDescription>
            <FieldGroup>
              <form.AppField name="paymentTerms">
                {(field) => (
                  <field.InputField
                    label="Payment Terms"
                    description="e.g., Net 30, Due Upon Receipt."
                    placeholder="Net 30"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sentAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Sent At"
                      description="When invoice was sent."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="paidAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Paid At"
                      description="When invoice was paid."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Notes</FieldLegend>
            <FieldDescription>Update invoice notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Special terms, fees, etc."
                    placeholder="Enter notes..."
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
