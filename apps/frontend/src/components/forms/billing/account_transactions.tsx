import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateAccountTransactionInputSchema,
  UpdateAccountTransactionInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createAccountTransactionSchema = CreateAccountTransactionInputSchema();
export const updateAccountTransactionSchema = UpdateAccountTransactionInputSchema();

export const createAccountTransactionFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createAccountTransactionSchema>,
});

export const updateAccountTransactionFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateAccountTransactionSchema>,
});

export const CreateAccountTransactionForm = withForm({
  ...createAccountTransactionFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Account Transaction</FieldLegend>
        <FieldDescription>Record a new account transaction.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link transaction to client account and source record.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientAccountId">
                  {(field) => (
                    <field.InputField
                      label="Client Account *"
                      description="Client account for this transaction."
                      placeholder="Account ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Processed By"
                      description="User who processed this transaction."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceRecordId">
                  {(field) => (
                    <field.InputField
                      label="Source Record ID"
                      description="ID of the source record (invoice, payment, etc)."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceRecordType">
                  {(field) => (
                    <field.InputField
                      label="Source Record Type"
                      description="Type of source record."
                      placeholder="e.g., Invoice, Payment, CreditNote"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Transaction Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Transaction Details</FieldLegend>
            <FieldDescription>Transaction type, amount, and reference information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="type">
                  {(field) => (
                    <field.InputField
                      label="Type *"
                      description="Transaction type (debit, credit, etc)."
                      placeholder="e.g., Debit, Credit"
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount *"
                      description="Transaction amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="runningBalance">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Running Balance"
                    description="Account balance after this transaction."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="referenceNumber">
                {(field) => (
                  <field.InputField
                    label="Reference Number"
                    description="Reference number for this transaction."
                    placeholder="e.g., CHQ-2024-001"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Description & Timestamp Section */}
          <FieldSet>
            <FieldLegend variant="label">Description & Timestamp</FieldLegend>
            <FieldDescription>Transaction description and processing date.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Transaction description."
                    placeholder="Enter transaction details..."
                  />
                )}
              </form.AppField>
              <form.AppField name="transactionDate">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Transaction Date *"
                    description="When the transaction occurred."
                    placeholder="YYYY-MM-DDTHH:mm"
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

export const UpdateAccountTransactionForm = withForm({
  ...updateAccountTransactionFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Account Transaction</FieldLegend>
        <FieldDescription>Update transaction details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update account and source record associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientAccountId">
                  {(field) => (
                    <field.InputField
                      label="Client Account"
                      description="Client account for this transaction."
                      placeholder="Account ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="processedByUserId">
                  {(field) => (
                    <field.InputField
                      label="Processed By"
                      description="User who processed this transaction."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceRecordId">
                  {(field) => (
                    <field.InputField
                      label="Source Record ID"
                      description="ID of the source record."
                      placeholder="Record ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceRecordType">
                  {(field) => (
                    <field.InputField
                      label="Source Record Type"
                      description="Type of source record."
                      placeholder="e.g., Invoice, Payment, CreditNote"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Transaction Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Transaction Details</FieldLegend>
            <FieldDescription>Update transaction type, amount, and reference.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="type">
                  {(field) => (
                    <field.InputField
                      label="Type"
                      description="Transaction type."
                      placeholder="e.g., Debit, Credit"
                    />
                  )}
                </form.AppField>
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount"
                      description="Transaction amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="runningBalance">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Running Balance"
                    description="Account balance after transaction."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="referenceNumber">
                {(field) => (
                  <field.InputField
                    label="Reference Number"
                    description="Reference number."
                    placeholder="e.g., CHQ-2024-001"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Description & Timestamp Section */}
          <FieldSet>
            <FieldLegend variant="label">Description & Timestamp</FieldLegend>
            <FieldDescription>Update description and processing date.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Transaction description."
                    placeholder="Enter transaction details..."
                  />
                )}
              </form.AppField>
              <form.AppField name="transactionDate">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Transaction Date"
                    description="When the transaction occurred."
                    placeholder="YYYY-MM-DDTHH:mm"
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
