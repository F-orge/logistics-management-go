import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePickBatchInputSchema,
  UpdatePickBatchInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPickBatchSchema = CreatePickBatchInputSchema();
export const updatePickBatchSchema = UpdatePickBatchInputSchema();

export const createPickBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPickBatchSchema>,
});

export const updatePickBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePickBatchSchema>,
});

export const CreatePickBatchForm = withForm({
  ...createPickBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Pick Batch</FieldLegend>
        <FieldDescription>
          Fill in the details for the new pick batch.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Batch Details</FieldLegend>
            <form.AppField name="batchNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="strategy">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="assignedUserId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="waveId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="zoneRestrictions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="totalItems">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="completedItems">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startedAt">
              {(field) => <field.InputField type="datetime-local" />}
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

export const UpdatePickBatchForm = withForm({
  ...updatePickBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Pick Batch</FieldLegend>
        <FieldDescription>
          Update the details for the pick batch.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Batch Details</FieldLegend>
            <form.AppField name="batchNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="strategy">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="assignedUserId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="waveId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="zoneRestrictions">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualDuration">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="totalItems">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="completedItems">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startedAt">
              {(field) => <field.InputField type="datetime-local" />}
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
