import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateBinThresholdInputSchema,
  UpdateBinThresholdInputSchema,
  SearchLocationsQuery,
  SearchWmsProductsQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createBinThresholdSchema = CreateBinThresholdInputSchema();
export const updateBinThresholdSchema = UpdateBinThresholdInputSchema();

export const createBinThresholdFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createBinThresholdSchema>,
});

export const updateBinThresholdFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateBinThresholdSchema>,
});

export const CreateBinThresholdForm = withForm({
  ...createBinThresholdFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Bin Threshold</FieldLegend>
        <FieldDescription>
          Set up threshold rules for bin inventory management.
        </FieldDescription>
        <FieldGroup>
          {/* Location & Product Section */}
          <FieldSet>
            <FieldLegend variant="label">Location & Product</FieldLegend>
            <FieldDescription>
              Link threshold to warehouse location and product.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchLocationsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.locations || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Location *"
                      description="Warehouse location for this threshold."
                      placeholder="Search location..."
                    />
                  )}
                </form.AppField>
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
                      description="Product stored in this location."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Thresholds Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity Thresholds</FieldLegend>
            <FieldDescription>
              Define minimum, maximum, and reorder quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Minimum Quantity *"
                      description="Minimum stock level before reorder."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Maximum Quantity *"
                      description="Maximum capacity for this bin."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="reorderQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Reorder Quantity *"
                      description="Amount to reorder when below minimum."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="alertThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Alert Threshold *"
                      description="Quantity level to trigger alert."
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
            <FieldDescription>
              Active status of this threshold rule.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Enable this threshold rule."
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

export const UpdateBinThresholdForm = withForm({
  ...updateBinThresholdFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Bin Threshold</FieldLegend>
        <FieldDescription>
          Update threshold rules for bin inventory management.
        </FieldDescription>
        <FieldGroup>
          {/* Location & Product Section */}
          <FieldSet>
            <FieldLegend variant="label">Location & Product</FieldLegend>
            <FieldDescription>
              Update location and product associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchLocationsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.locations || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Location"
                      description="Warehouse location for this threshold."
                      placeholder="Search location..."
                    />
                  )}
                </form.AppField>
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
                      description="Product stored in this location."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Thresholds Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity Thresholds</FieldLegend>
            <FieldDescription>
              Update minimum, maximum, and reorder quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Minimum Quantity"
                      description="Minimum stock level before reorder."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Maximum Quantity"
                      description="Maximum capacity for this bin."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="reorderQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Reorder Quantity"
                      description="Amount to reorder when below minimum."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="alertThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Alert Threshold"
                      description="Quantity level to trigger alert."
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
            <FieldDescription>
              Update active status of this threshold rule.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Enable this threshold rule."
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
