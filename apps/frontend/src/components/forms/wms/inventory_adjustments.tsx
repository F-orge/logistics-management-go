import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInventoryAdjustmentInputSchema,
  UpdateInventoryAdjustmentInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInventoryAdjustmentSchema = CreateInventoryAdjustmentInputSchema();
export const updateInventoryAdjustmentSchema = UpdateInventoryAdjustmentInputSchema();

export const createInventoryAdjustmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInventoryAdjustmentSchema>,
});

export const updateInventoryAdjustmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInventoryAdjustmentSchema>,
});

export const CreateInventoryAdjustmentForm = withForm({
  ...createInventoryAdjustmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inventory Adjustment</FieldLegend>
        <FieldDescription>
          Fill in the details for the new inventory adjustment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Adjustment Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityChange">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInventoryAdjustmentForm = withForm({
  ...updateInventoryAdjustmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inventory Adjustment</FieldLegend>
        <FieldDescription>
          Update the details for the inventory adjustment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Adjustment Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityChange">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
