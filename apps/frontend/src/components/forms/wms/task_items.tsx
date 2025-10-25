import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskItemInputSchema,
  UpdateTaskItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTaskItemSchema = CreateTaskItemInputSchema();
export const updateTaskItemSchema = UpdateTaskItemInputSchema();

export const createTaskItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskItemSchema>,
});

export const updateTaskItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskItemSchema>,
});

export const CreateTaskItemForm = withForm({
  ...createTaskItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new task item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="taskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityRequired">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="quantityCompleted">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lotNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serialNumbers">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="completedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateTaskItemForm = withForm({
  ...updateTaskItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task Item</FieldLegend>
        <FieldDescription>
          Update the details for the task item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="taskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityRequired">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="quantityCompleted">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lotNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serialNumbers">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="completedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
