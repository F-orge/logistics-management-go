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
        <FieldDescription>Fill in the details for the new expense.</FieldDescription>
        <FieldGroup>
          {/* Expense Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Expense Details</FieldLegend>
            <FieldDescription>Basic expense information and type.</FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Type of expense (fuel, tolls, maintenance, etc.)."
                    placeholder="e.g., Fuel, Tolls, Maintenance"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount *"
                      description="Expense amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency *"
                      description="Currency code."
                      placeholder="e.g., USD, EUR, GBP"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed description of the expense."
                    placeholder="Enter expense details..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Fuel & Vehicle Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Fuel & Vehicle Details</FieldLegend>
            <FieldDescription>Fuel and odometer information for the trip.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="fuelQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Fuel Quantity (L)"
                      description="Amount of fuel purchased in liters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="odometerReading">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Odometer Reading (km)"
                      description="Vehicle odometer reading."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timeline & Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline & Status</FieldLegend>
            <FieldDescription>Expense date and approval status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="expenseDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expense Date *"
                    description="When the expense was incurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current approval status."
                    placeholder="e.g., Pending, Approved, Rejected"
                  />
                )}
              </form.AppField>
              <form.AppField name="receiptUrl">
                {(field) => (
                  <field.InputField
                    label="Receipt URL"
                    description="URL to the receipt documentation."
                    placeholder="https://..."
                    type="url"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link expense to a trip and driver.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip *"
                    description="The trip this expense is for."
                    placeholder="Trip ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver *"
                    description="The driver who incurred this expense."
                    placeholder="Driver ID"
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

export const UpdateExpenseForm = withForm({
  ...updateExpenseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Expense</FieldLegend>
        <FieldDescription>Update the details for the expense.</FieldDescription>
        <FieldGroup>
          {/* Expense Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Expense Details</FieldLegend>
            <FieldDescription>Update basic expense information and type.</FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Type of expense (fuel, tolls, maintenance, etc.)."
                    placeholder="e.g., Fuel, Tolls, Maintenance"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount"
                      description="Expense amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="currency">
                  {(field) => (
                    <field.InputField
                      label="Currency"
                      description="Currency code."
                      placeholder="e.g., USD, EUR, GBP"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed description of the expense."
                    placeholder="Enter expense details..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Fuel & Vehicle Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Fuel & Vehicle Details</FieldLegend>
            <FieldDescription>Update fuel and odometer information for the trip.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="fuelQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Fuel Quantity (L)"
                      description="Amount of fuel purchased in liters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="odometerReading">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Odometer Reading (km)"
                      description="Vehicle odometer reading."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timeline & Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline & Status</FieldLegend>
            <FieldDescription>Update expense date and approval status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="expenseDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expense Date"
                    description="When the expense was incurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current approval status."
                    placeholder="e.g., Pending, Approved, Rejected"
                  />
                )}
              </form.AppField>
              <form.AppField name="receiptUrl">
                {(field) => (
                  <field.InputField
                    label="Receipt URL"
                    description="URL to the receipt documentation."
                    placeholder="https://..."
                    type="url"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update trip and driver associations.</FieldDescription>
            <FieldGroup>
              <form.AppField name="tripId">
                {(field) => (
                  <field.InputField
                    label="Trip"
                    description="The trip this expense is for."
                    placeholder="Trip ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver"
                    description="The driver who incurred this expense."
                    placeholder="Driver ID"
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
