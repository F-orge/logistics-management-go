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
  SearchWmsProductsQuery,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createInventoryAdjustmentSchema =
  CreateInventoryAdjustmentInputSchema();
export const updateInventoryAdjustmentSchema =
  UpdateInventoryAdjustmentInputSchema();

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
          Record an adjustment to inventory stock.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Product, warehouse, and user involved in adjustment.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWmsProductsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.wmsProducts || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Product *"
                      description="Product being adjusted."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWarehousesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.warehouses || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Warehouse *"
                      description="Warehouse location of adjustment."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User *"
                    description="User performing the adjustment."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Adjustment Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Adjustment Details</FieldLegend>
            <FieldDescription>
              Quantity change and reason for adjustment.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityChange">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Change *"
                      description="Amount to increase/decrease (negative for decrease)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="reason">
                  {(field) => (
                    <field.TextAreaField
                      label="Reason *"
                      description="Reason for adjustment."
                      placeholder="e.g., Damage, Shrinkage, Correction"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Notes</FieldLegend>
            <FieldDescription>
              Additional details about this adjustment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional notes or comments."
                    placeholder="Enter adjustment notes..."
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

export const UpdateInventoryAdjustmentForm = withForm({
  ...updateInventoryAdjustmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inventory Adjustment</FieldLegend>
        <FieldDescription>Update inventory adjustment record.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update product, warehouse, and user details.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWmsProductsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.wmsProducts || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Product"
                      description="Product being adjusted."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWarehousesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.warehouses || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Warehouse"
                      description="Warehouse location of adjustment."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User"
                    description="User performing the adjustment."
                    placeholder="User ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Adjustment Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Adjustment Details</FieldLegend>
            <FieldDescription>
              Update quantity change and reason.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityChange">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Change"
                      description="Amount to increase/decrease (negative for decrease)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="reason">
                  {(field) => (
                    <field.TextAreaField
                      label="Reason"
                      description="Reason for adjustment."
                      placeholder="e.g., Damage, Shrinkage, Correction"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Notes</FieldLegend>
            <FieldDescription>
              Update additional details about this adjustment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional notes or comments."
                    placeholder="Enter adjustment notes..."
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
