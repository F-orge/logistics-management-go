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
  InvoiceStatus,
  CrmInvoicePaymentMethod,
  execute,
  SearchOpportunitiesQuery,
} from "@packages/graphql/client";
import z from "zod";
import { SearchOpportunitiesQuery as OpportunityQuery } from "@packages/graphql/client/generated/graphql";

export const createInvoiceSchema = CreateInvoiceInputSchema();
export const updateInvoiceSchema = UpdateInvoiceInputSchema();

// Invoice Status Options
const INVOICE_STATUS_OPTIONS = [
  { label: "Draft", value: InvoiceStatus.Draft },
  { label: "Sent", value: InvoiceStatus.Sent },
  { label: "Paid", value: InvoiceStatus.Paid },
  { label: "Overdue", value: InvoiceStatus.Overdue },
  { label: "Cancelled", value: InvoiceStatus.Cancelled },
];

// Payment Method Options
const PAYMENT_METHOD_OPTIONS = [
  { label: "Credit Card", value: CrmInvoicePaymentMethod.CreditCard },
  { label: "Bank Transfer", value: CrmInvoicePaymentMethod.BankTransfer },
  { label: "Cash", value: CrmInvoicePaymentMethod.Cash },
  { label: "Check", value: CrmInvoicePaymentMethod.Check },
  { label: "PayPal", value: CrmInvoicePaymentMethod.Paypal },
  { label: "Stripe", value: CrmInvoicePaymentMethod.Stripe },
  { label: "Wire Transfer", value: CrmInvoicePaymentMethod.WireTransfer },
  { label: "Other", value: CrmInvoicePaymentMethod.Other },
  { label: "Maya", value: CrmInvoicePaymentMethod.Maya },
];

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
          {/* Invoice Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Information</FieldLegend>
            <FieldDescription>
              Basic invoice details and status.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.SelectField
                    label="Status *"
                    description="Current status of the invoice."
                    options={INVOICE_STATUS_OPTIONS}
                    placeholder="Select status"
                  />
                )}
              </form.AppField>
              <form.AppField name="total">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Total Amount *"
                    description="Total invoice amount."
                    placeholder="0.00"
                    step="0.01"
                  />
                )}
              </form.AppField>
              <form.AppField name="paymentMethod">
                {(field) => (
                  <field.SelectField
                    label="Payment Method"
                    description="Preferred payment method."
                    options={PAYMENT_METHOD_OPTIONS}
                    placeholder="Select payment method"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Important dates for the invoice.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date *"
                      description="When the invoice was issued."
                    />
                  )}
                </form.AppField>
                <form.AppField name="dueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Due Date *"
                      description="When payment is due."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sentAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Sent Date"
                      description="When the invoice was sent to the customer."
                    />
                  )}
                </form.AppField>
                <form.AppField name="paidAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Paid Date"
                      description="When the invoice was paid."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this invoice to an opportunity.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="opportunityId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchOpportunitiesQuery,
                        {
                          search: query || "",
                        }
                      );
                      return data?.crm?.opportunities || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Opportunity *"
                    description="The opportunity associated with this invoice."
                    placeholder="Search opportunity..."
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

export const UpdateInvoiceForm = withForm({
  ...updateInvoiceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Invoice</FieldLegend>
        <FieldDescription>Update the details for the invoice.</FieldDescription>
        <FieldGroup>
          {/* Invoice Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Information</FieldLegend>
            <FieldDescription>
              Basic invoice details and status.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.SelectField
                    label="Status"
                    description="Current status of the invoice."
                    options={INVOICE_STATUS_OPTIONS}
                    placeholder="Select status"
                  />
                )}
              </form.AppField>
              <form.AppField name="total">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Total Amount"
                    description="Total invoice amount."
                    placeholder="0.00"
                    step="0.01"
                  />
                )}
              </form.AppField>
              <form.AppField name="paymentMethod">
                {(field) => (
                  <field.SelectField
                    label="Payment Method"
                    description="Preferred payment method."
                    options={PAYMENT_METHOD_OPTIONS}
                    placeholder="Select payment method"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Important dates for the invoice.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date"
                      description="When the invoice was issued."
                    />
                  )}
                </form.AppField>
                <form.AppField name="dueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Due Date"
                      description="When payment is due."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sentAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Sent Date"
                      description="When the invoice was sent to the customer."
                    />
                  )}
                </form.AppField>
                <form.AppField name="paidAt">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Paid Date"
                      description="When the invoice was paid."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this invoice to an opportunity.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="opportunityId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchOpportunitiesQuery,
                        {
                          search: query || "",
                        }
                      );
                      return data?.crm?.opportunities || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Opportunity"
                    description="The opportunity associated with this invoice."
                    placeholder="Search opportunity..."
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
