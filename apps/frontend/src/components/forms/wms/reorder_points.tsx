import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReorderPointInputSchema,
  UpdateReorderPointInputSchema,
  SearchWmsProductsQuery,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createReorderPointSchema = CreateReorderPointInputSchema();
export const updateReorderPointSchema = UpdateReorderPointInputSchema();

export const createReorderPointFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReorderPointSchema>,
});

export const updateReorderPointFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReorderPointSchema>,
});

export const CreateReorderPointForm = withForm({
  ...createReorderPointFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Reorder Point</FieldLegend>
        <FieldDescription>Set inventory reorder thresholds.</FieldDescription>
        <FieldGroup>
          {/* Relations & Threshold Section */}
          <FieldSet>
            <FieldLegend variant="label">Reorder Configuration</FieldLegend>
            <FieldDescription>
              Product, warehouse, and threshold quantity.
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
                      description="Product for reorder point."
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
                      description="Warehouse location."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="threshold">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Threshold *"
                    description="Quantity to trigger reorder."
                    placeholder="0"
                    step="1"
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

export const UpdateReorderPointForm = withForm({
  ...updateReorderPointFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Reorder Point</FieldLegend>
        <FieldDescription>
          Update inventory reorder thresholds.
        </FieldDescription>
        <FieldGroup>
          {/* Relations & Threshold Section */}
          <FieldSet>
            <FieldLegend variant="label">Reorder Configuration</FieldLegend>
            <FieldDescription>
              Update product, warehouse, and threshold.
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
                      description="Product for reorder point."
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
                      description="Warehouse location."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="threshold">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Threshold"
                    description="Quantity to trigger reorder."
                    placeholder="0"
                    step="1"
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
