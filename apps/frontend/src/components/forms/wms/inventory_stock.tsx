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
        <FieldDescription>Record stock levels at a warehouse location.</FieldDescription>
        <FieldGroup>
          {/* Location & Product Section */}
          <FieldSet>
            <FieldLegend variant="label">Location & Product</FieldLegend>
            <FieldDescription>Link stock to location, product, and batch.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationId">
                  {(field) => (
                    <field.InputField
                      label="Location *"
                      description="Warehouse location where stock is stored."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product *"
                      description="Product being stored."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="batchId">
                {(field) => (
                  <field.InputField
                    label="Batch"
                    description="Batch ID if applicable."
                    placeholder="Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantities</FieldLegend>
            <FieldDescription>Available and reserved stock quantities.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Available Quantity *"
                      description="Current available stock."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="reservedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Reserved Quantity *"
                      description="Quantity reserved for orders."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Stock status and tracking information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current stock status."
                    placeholder="e.g., Available, Damaged, Quarantine"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Tracking Timestamps</FieldLegend>
            <FieldDescription>Last count and movement timestamps.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lastCountedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Counted"
                      description="When this stock was last physically counted."
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastMovementAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Movement"
                      description="When stock was last moved or adjusted."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
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
        <FieldDescription>Update stock levels at warehouse location.</FieldDescription>
        <FieldGroup>
          {/* Location & Product Section */}
          <FieldSet>
            <FieldLegend variant="label">Location & Product</FieldLegend>
            <FieldDescription>Update location, product, and batch associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationId">
                  {(field) => (
                    <field.InputField
                      label="Location"
                      description="Warehouse location where stock is stored."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product"
                      description="Product being stored."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="batchId">
                {(field) => (
                  <field.InputField
                    label="Batch"
                    description="Batch ID if applicable."
                    placeholder="Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantities</FieldLegend>
            <FieldDescription>Update available and reserved quantities.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Available Quantity"
                      description="Current available stock."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="reservedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Reserved Quantity"
                      description="Quantity reserved for orders."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Update stock status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current stock status."
                    placeholder="e.g., Available, Damaged, Quarantine"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Tracking Timestamps</FieldLegend>
            <FieldDescription>Update last count and movement timestamps.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lastCountedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Counted"
                      description="When this stock was last physically counted."
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastMovementAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Last Movement"
                      description="When stock was last moved or adjusted."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
