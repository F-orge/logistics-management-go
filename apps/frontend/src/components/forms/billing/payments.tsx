import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePaymentInputSchema,
  UpdatePaymentInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPaymentSchema = CreatePaymentInputSchema();
export const updatePaymentSchema = UpdatePaymentInputSchema();

export const createPaymentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPaymentSchema>,
});

export const updatePaymentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePaymentSchema>,
});

export const CreatePaymentForm = withForm({
  ...createPaymentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Payment</FieldLegend>
        <FieldDescription>Record a payment transaction.</FieldDescription>
        <FieldGroup>
          {/* Invoice & Relation Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice & Relation</FieldLegend>
            <FieldDescription>Invoice and user information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.InputField
                      label="Invoice *"
                      description="Invoice being paid."
                      placeholder="Invoice ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Processed By"
                      description="User who recorded payment."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Payment Amount Section */}
          <FieldSet>
            <FieldLegend variant="label">Payment Amount</FieldLegend>
            <FieldDescription>Amount and currency information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount *"
                      description="Payment amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency *"
                      description="Payment currency."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="exchangeRate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Exchange Rate"
                    description="Exchange rate if different currency."
                    placeholder="1.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Payment Method Section */}
          <FieldSet>
            <FieldLegend variant="label">Payment Method</FieldLegend>
            <FieldDescription>Payment method and gateway details.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="paymentMethod">
                  {(field) => (
                    <field.InputField
                      label="Payment Method *"
                      description="How payment was received."
                      placeholder="e.g., Wire Transfer, Credit Card, Check"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Payment status."
                      placeholder="e.g., Pending, Completed, Failed"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="transactionId">
                  {(field) => (
                    <field.InputField
                      label="Transaction ID"
                      description="Internal transaction reference."
                      placeholder="Transaction ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="gatewayReference">
                  {(field) => (
                    <field.InputField
                      label="Gateway Reference"
                      description="Payment gateway reference."
                      placeholder="Gateway ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Fees & Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Fees & Dates</FieldLegend>
            <FieldDescription>Processing fees and payment dates.</FieldDescription>
            <FieldGroup>
              <form.AppField name="fees">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Fees"
                    description="Processing or transaction fees."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="paymentDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Payment Date *"
                      description="Date payment was made."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Processed At"
                      description="When payment was processed."
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
            <FieldDescription>Additional payment notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Payment notes or remarks."
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

export const UpdatePaymentForm = withForm({
  ...updatePaymentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Payment</FieldLegend>
        <FieldDescription>Update payment details.</FieldDescription>
        <FieldGroup>
          {/* Invoice & Relation Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice & Relation</FieldLegend>
            <FieldDescription>Update invoice and user information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.InputField
                      label="Invoice"
                      description="Invoice being paid."
                      placeholder="Invoice ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Processed By"
                      description="User who recorded payment."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Payment Amount Section */}
          <FieldSet>
            <FieldLegend variant="label">Payment Amount</FieldLegend>
            <FieldDescription>Update amount and currency.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount"
                      description="Payment amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency"
                      description="Payment currency."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="exchangeRate">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Exchange Rate"
                    description="Exchange rate if applicable."
                    placeholder="1.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Payment Method Section */}
          <FieldSet>
            <FieldLegend variant="label">Payment Method</FieldLegend>
            <FieldDescription>Update payment method and status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="paymentMethod">
                  {(field) => (
                    <field.InputField
                      label="Payment Method"
                      description="How payment was received."
                      placeholder="e.g., Wire Transfer, Card"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Payment status."
                      placeholder="e.g., Pending, Completed, Failed"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="transactionId">
                  {(field) => (
                    <field.InputField
                      label="Transaction ID"
                      description="Internal transaction reference."
                      placeholder="Transaction ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="gatewayReference">
                  {(field) => (
                    <field.InputField
                      label="Gateway Reference"
                      description="Payment gateway reference."
                      placeholder="Gateway ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Fees & Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Fees & Dates</FieldLegend>
            <FieldDescription>Update fees and dates.</FieldDescription>
            <FieldGroup>
              <form.AppField name="fees">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Fees"
                    description="Processing fees."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="paymentDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Payment Date"
                      description="Date payment was made."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Processed At"
                      description="When processed."
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
            <FieldDescription>Update payment notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Payment remarks."
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
