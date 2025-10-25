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
        <FieldDescription>Create inter-warehouse stock transfer.</FieldDescription>
        <FieldGroup>
          {/* Transfer Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Transfer Information</FieldLegend>
            <FieldDescription>Product and quantity being transferred.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product *"
                      description="Product being transferred."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity *"
                      description="Quantity to transfer."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Warehouse Transfer Section */}
          <FieldSet>
            <FieldLegend variant="label">Warehouse Transfer</FieldLegend>
            <FieldDescription>Source and destination warehouses.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceWarehouseId">
                  {(field) => (
                    <field.InputField
                      label="Source Warehouse *"
                      description="Origin warehouse."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="destinationWarehouseId">
                  {(field) => (
                    <field.InputField
                      label="Destination Warehouse *"
                      description="Destination warehouse."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Transfer status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current transfer status."
                    placeholder="e.g., Pending, In Transit, Completed"
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

export const UpdateStockTransferForm = withForm({
  ...updateStockTransferFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Stock Transfer</FieldLegend>
        <FieldDescription>Update inter-warehouse stock transfer.</FieldDescription>
        <FieldGroup>
          {/* Transfer Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Transfer Information</FieldLegend>
            <FieldDescription>Product and quantity details.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product"
                      description="Product being transferred."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity"
                      description="Quantity to transfer."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Warehouse Transfer Section */}
          <FieldSet>
            <FieldLegend variant="label">Warehouse Transfer</FieldLegend>
            <FieldDescription>Update source and destination warehouses.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceWarehouseId">
                  {(field) => (
                    <field.InputField
                      label="Source Warehouse"
                      description="Origin warehouse."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="destinationWarehouseId">
                  {(field) => (
                    <field.InputField
                      label="Destination Warehouse"
                      description="Destination warehouse."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Update transfer status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current transfer status."
                    placeholder="e.g., Pending, In Transit, Completed"
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
