import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCreditNoteInputSchema,
  UpdateCreditNoteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCreditNoteSchema = CreateCreditNoteInputSchema();
export const updateCreditNoteSchema = UpdateCreditNoteInputSchema();

export const createCreditNoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCreditNoteSchema>,
});

export const updateCreditNoteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCreditNoteSchema>,
});

export const CreateCreditNoteForm = withForm({
  ...createCreditNoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Credit Note</FieldLegend>
        <FieldDescription>Issue a credit note for refund or adjustment.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link credit note to invoice and dispute.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.InputField
                      label="Invoice *"
                      description="Original invoice for this credit note."
                      placeholder="Invoice ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="disputeId">
                  {(field) => (
                    <field.InputField
                      label="Dispute"
                      description="Associated dispute (optional)."
                      placeholder="Dispute ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="createdByUserId">
                {(field) => (
                  <field.InputField
                    label="Created By"
                    description="User who created this credit note."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Credit Note Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Credit Note Details</FieldLegend>
            <FieldDescription>Credit note number, amount, and reason.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="creditNoteNumber">
                  {(field) => (
                    <field.InputField
                      label="Credit Note Number *"
                      description="Unique credit note identifier."
                      placeholder="e.g., CN-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount *"
                      description="Credit amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="reason">
                  {(field) => (
                    <field.InputField
                      label="Reason *"
                      description="Reason for credit note."
                      placeholder="e.g., Overcharge, Service Issue"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency *"
                      description="Currency for this credit note."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Dates</FieldLegend>
            <FieldDescription>Issue and application dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date *"
                      description="When credit note was issued."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="appliedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Applied At"
                      description="When credit was applied."
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
            <FieldDescription>Additional information about this credit note.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes or comments."
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

export const UpdateCreditNoteForm = withForm({
  ...updateCreditNoteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Credit Note</FieldLegend>
        <FieldDescription>Update credit note information.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update invoice and dispute associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="invoiceId">
                  {(field) => (
                    <field.InputField
                      label="Invoice"
                      description="Original invoice."
                      placeholder="Invoice ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="disputeId">
                  {(field) => (
                    <field.InputField
                      label="Dispute"
                      description="Associated dispute."
                      placeholder="Dispute ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="createdByUserId">
                {(field) => (
                  <field.InputField
                    label="Created By"
                    description="User who created this credit note."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Credit Note Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Credit Note Details</FieldLegend>
            <FieldDescription>Update credit note information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="creditNoteNumber">
                  {(field) => (
                    <field.InputField
                      label="Credit Note Number"
                      description="Unique identifier."
                      placeholder="e.g., CN-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount"
                      description="Credit amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="reason">
                  {(field) => (
                    <field.InputField
                      label="Reason"
                      description="Reason for credit note."
                      placeholder="e.g., Overcharge, Service Issue"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency"
                      description="Currency for credit note."
                      placeholder="e.g., USD, EUR"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Dates Section */}
          <FieldSet>
            <FieldLegend variant="label">Dates</FieldLegend>
            <FieldDescription>Update issue and application dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="issueDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Issue Date"
                      description="When credit note was issued."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="appliedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Applied At"
                      description="When credit was applied."
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
            <FieldDescription>Update notes and comments.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes."
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
