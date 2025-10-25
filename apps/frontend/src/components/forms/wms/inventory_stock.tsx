import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInventoryStockInputSchema,
  UpdateInventoryStockInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInventoryStockSchema = CreateInventoryStockInputSchema();
export const updateInventoryStockSchema = UpdateInventoryStockInputSchema();

export const createInventoryStockFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInventoryStockSchema>,
});

export const updateInventoryStockFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInventoryStockSchema>,
});

export const CreateInventoryStockForm = withForm({
  ...createInventoryStockFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inventory Stock</FieldLegend>
        <FieldDescription>
          Fill in the details for the new inventory stock.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Stock Details</FieldLegend>
            <form.AppField name="locationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reservedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lastCountedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="lastMovementAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInventoryStockForm = withForm({
  ...updateInventoryStockFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inventory Stock</FieldLegend>
        <FieldDescription>
          Update the details for the inventory stock.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Stock Details</FieldLegend>
            <form.AppField name="locationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reservedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="lastCountedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="lastMovementAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
