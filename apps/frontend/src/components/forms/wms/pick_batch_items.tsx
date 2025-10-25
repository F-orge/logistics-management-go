import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePickBatchItemInputSchema,
  UpdatePickBatchItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPickBatchItemSchema = CreatePickBatchItemInputSchema();
export const updatePickBatchItemSchema = UpdatePickBatchItemInputSchema();

export const createPickBatchItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPickBatchItemSchema>,
});

export const updatePickBatchItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePickBatchItemSchema>,
});

export const CreatePickBatchItemForm = withForm({
  ...createPickBatchItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Pick Batch Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new pick batch item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="pickBatchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="orderPriority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="estimatedPickTime">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualPickTime">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdatePickBatchItemForm = withForm({
  ...updatePickBatchItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Pick Batch Item</FieldLegend>
        <FieldDescription>
          Update the details for the pick batch item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="pickBatchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="orderPriority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="estimatedPickTime">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="actualPickTime">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
