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
        <FieldDescription>Fill in the details for the new invoice.</FieldDescription>
        <FieldGroup>
          {/* Invoice Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Invoice Information</FieldLegend>
            <FieldDescription>Basic invoice details and status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the invoice."
                    placeholder="e.g., Draft, Sent, Paid"
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
                  <field.InputField
                    label="Payment Method"
                    description="Preferred payment method."
                    placeholder="e.g., Credit Card, Bank Transfer, Check"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Important dates for the invoice.</FieldDescription>
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
            <FieldDescription>Link this invoice to an opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="opportunityId">
                {(field) => (
                  <field.InputField
                    label="Opportunity *"
                    description="The opportunity associated with this invoice."
                    placeholder="Opportunity ID"
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
            <FieldDescription>Basic invoice details and status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the invoice."
                    placeholder="e.g., Draft, Sent, Paid"
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
                  <field.InputField
                    label="Payment Method"
                    description="Preferred payment method."
                    placeholder="e.g., Credit Card, Bank Transfer, Check"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Important dates for the invoice.</FieldDescription>
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
            <FieldDescription>Link this invoice to an opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="opportunityId">
                {(field) => (
                  <field.InputField
                    label="Opportunity"
                    description="The opportunity associated with this invoice."
                    placeholder="Opportunity ID"
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
