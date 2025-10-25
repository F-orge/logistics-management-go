import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskInputSchema,
  UpdateTaskInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTaskSchema = CreateTaskInputSchema();
export const updateTaskSchema = UpdateTaskInputSchema();

export const createTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskSchema>,
});

export const updateTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskSchema>,
});

export const CreateTaskForm = withForm({
  ...createTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task</FieldLegend>
        <FieldDescription>
          Fill in the details for the new task.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Task Details</FieldLegend>
            <form.AppField name="taskNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="sourceEntityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceEntityType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="pickBatchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="instructions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="endTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateTaskForm = withForm({
  ...updateTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task</FieldLegend>
        <FieldDescription>
          Update the details for the task.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Task Details</FieldLegend>
            <form.AppField name="taskNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="sourceEntityId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceEntityType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="pickBatchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="instructions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="endTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
