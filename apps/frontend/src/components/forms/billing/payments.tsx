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
        <FieldDescription>
          Fill in the details for the new payment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="paymentMethod">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="transactionId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="gatewayReference">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="paymentDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="processedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="exchangeRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="fees">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
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

export const UpdatePaymentForm = withForm({
  ...updatePaymentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Payment</FieldLegend>
        <FieldDescription>
          Update the details for the payment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Details</FieldLegend>
            <form.AppField name="invoiceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="paymentMethod">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="transactionId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="gatewayReference">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="paymentDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="processedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="exchangeRate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="fees">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
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
