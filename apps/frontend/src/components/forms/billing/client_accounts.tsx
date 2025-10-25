import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateClientAccountInputSchema,
  UpdateClientAccountInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createClientAccountSchema = CreateClientAccountInputSchema();
export const updateClientAccountSchema = UpdateClientAccountInputSchema();

export const createClientAccountFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createClientAccountSchema>,
});

export const updateClientAccountFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateClientAccountSchema>,
});

export const CreateClientAccountForm = withForm({
  ...createClientAccountFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Client Account</FieldLegend>
        <FieldDescription>Set up billing account for client.</FieldDescription>
        <FieldGroup>
          {/* Client & Currency Section */}
          <FieldSet>
            <FieldLegend variant="label">Client & Currency</FieldLegend>
            <FieldDescription>Client assignment and currency settings.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client *"
                      description="The client for this account."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency *"
                      description="Account currency."
                      placeholder="e.g., USD, EUR, GBP"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Credit Settings Section */}
          <FieldSet>
            <FieldLegend variant="label">Credit Settings</FieldLegend>
            <FieldDescription>Credit limits and approval status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="creditLimit">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Credit Limit *"
                      description="Maximum credit amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="availableCredit">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Available Credit *"
                      description="Remaining available credit."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isCreditApproved">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Credit Approved"
                    description="Credit terms have been approved."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Balance & Payment Section */}
          <FieldSet>
            <FieldLegend variant="label">Balance & Payment</FieldLegend>
            <FieldDescription>Wallet balance and payment terms.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="walletBalance">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Wallet Balance *"
                      description="Current prepaid balance."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="paymentTermsDays">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Payment Terms (Days) *"
                      description="Net payment terms in days."
                      placeholder="30"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="lastPaymentDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Last Payment Date"
                    description="Date of last payment received."
                    placeholder="YYYY-MM-DD"
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

export const UpdateClientAccountForm = withForm({
  ...updateClientAccountFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Client Account</FieldLegend>
        <FieldDescription>Update billing account settings.</FieldDescription>
        <FieldGroup>
          {/* Client & Currency Section */}
          <FieldSet>
            <FieldLegend variant="label">Client & Currency</FieldLegend>
            <FieldDescription>Update client and currency information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="The client for this account."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency"
                      description="Account currency."
                      placeholder="e.g., USD, EUR, GBP"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Credit Settings Section */}
          <FieldSet>
            <FieldLegend variant="label">Credit Settings</FieldLegend>
            <FieldDescription>Update credit limits and approval status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="creditLimit">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Credit Limit"
                      description="Maximum credit amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="availableCredit">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Available Credit"
                      description="Remaining available credit."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isCreditApproved">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Credit Approved"
                    description="Credit terms have been approved."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Balance & Payment Section */}
          <FieldSet>
            <FieldLegend variant="label">Balance & Payment</FieldLegend>
            <FieldDescription>Update wallet balance and payment terms.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="walletBalance">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Wallet Balance"
                      description="Current prepaid balance."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="paymentTermsDays">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Payment Terms (Days)"
                      description="Net payment terms in days."
                      placeholder="30"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="lastPaymentDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Last Payment Date"
                    description="Date of last payment received."
                    placeholder="YYYY-MM-DD"
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
