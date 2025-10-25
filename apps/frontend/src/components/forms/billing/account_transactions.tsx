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
        <FieldDescription>
          Fill in the details for the new account transaction.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Transaction Details</FieldLegend>
            <form.AppField name="clientAccountId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="runningBalance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="sourceRecordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="referenceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="transactionDate">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="processedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the account transaction.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Transaction Details</FieldLegend>
            <form.AppField name="clientAccountId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="runningBalance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="sourceRecordId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceRecordType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="referenceNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="transactionDate">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="processedByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
