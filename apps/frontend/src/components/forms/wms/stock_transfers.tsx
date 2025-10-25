import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateStockTransferInputSchema,
  UpdateStockTransferInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createStockTransferSchema = CreateStockTransferInputSchema();
export const updateStockTransferSchema = UpdateStockTransferInputSchema();

export const createStockTransferFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createStockTransferSchema>,
});

export const updateStockTransferFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateStockTransferSchema>,
});

export const CreateStockTransferForm = withForm({
  ...createStockTransferFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Stock Transfer</FieldLegend>
        <FieldDescription>
          Fill in the details for the new stock transfer.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Transfer Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceWarehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationWarehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateStockTransferForm = withForm({
  ...updateStockTransferFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Stock Transfer</FieldLegend>
        <FieldDescription>
          Update the details for the stock transfer.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Transfer Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sourceWarehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destinationWarehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
