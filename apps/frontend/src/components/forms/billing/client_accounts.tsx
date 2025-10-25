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
        <FieldDescription>
          Fill in the details for the new client account.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Account Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="creditLimit">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="availableCredit">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="walletBalance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="paymentTermsDays">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="isCreditApproved">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="lastPaymentDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the client account.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Account Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="creditLimit">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="availableCredit">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="walletBalance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="paymentTermsDays">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="isCreditApproved">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="lastPaymentDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
