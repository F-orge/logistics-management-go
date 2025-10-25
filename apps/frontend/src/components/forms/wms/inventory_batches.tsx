import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInventoryBatchInputSchema,
  UpdateInventoryBatchInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInventoryBatchSchema = CreateInventoryBatchInputSchema();
export const updateInventoryBatchSchema = UpdateInventoryBatchInputSchema();

export const createInventoryBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInventoryBatchSchema>,
});

export const updateInventoryBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInventoryBatchSchema>,
});

export const CreateInventoryBatchForm = withForm({
  ...createInventoryBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inventory Batch</FieldLegend>
        <FieldDescription>
          Fill in the details for the new inventory batch.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Batch Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expirationDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInventoryBatchForm = withForm({
  ...updateInventoryBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inventory Batch</FieldLegend>
        <FieldDescription>
          Update the details for the inventory batch.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Batch Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expirationDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
