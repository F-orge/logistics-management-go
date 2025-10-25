import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateExpenseInputSchema,
  UpdateExpenseInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createExpenseSchema = CreateExpenseInputSchema();
export const updateExpenseSchema = UpdateExpenseInputSchema();

export const createExpenseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createExpenseSchema>,
});

export const updateExpenseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateExpenseSchema>,
});

export const CreateExpenseForm = withForm({
  ...createExpenseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Expense</FieldLegend>
        <FieldDescription>
          Fill in the details for the new expense.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Expense Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="receiptUrl">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="fuelQuantity">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="odometerReading">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expenseDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateExpenseForm = withForm({
  ...updateExpenseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Expense</FieldLegend>
        <FieldDescription>
          Update the details for the expense.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Expense Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="currency">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="receiptUrl">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="fuelQuantity">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="odometerReading">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expenseDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
