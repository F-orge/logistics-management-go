import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSalesOrderItemInputSchema,
  UpdateSalesOrderItemInputSchema,
  SearchWmsProductsQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createSalesOrderItemSchema = CreateSalesOrderItemInputSchema();
export const updateSalesOrderItemSchema = UpdateSalesOrderItemInputSchema();

export const createSalesOrderItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSalesOrderItemSchema>,
});

export const updateSalesOrderItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSalesOrderItemSchema>,
});

export const CreateSalesOrderItemForm = withForm({
  ...createSalesOrderItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Sales Order Item</FieldLegend>
        <FieldDescription>Add product line to sales order.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link item to sales order and product.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order *"
                      description="The sales order this item belongs to."
                      placeholder="Enter sales order ID..."
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
                      description="The product ordered."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>Order quantity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="quantityOrdered">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity Ordered *"
                    description="Quantity of product ordered."
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

export const UpdateSalesOrderItemForm = withForm({
  ...updateSalesOrderItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Sales Order Item</FieldLegend>
        <FieldDescription>Update product line in sales order.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update sales order and product associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order"
                      description="The sales order this item belongs to."
                      placeholder="Enter sales order ID..."
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
                      description="The product ordered."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>Update order quantity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="quantityOrdered">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity Ordered"
                    description="Quantity of product ordered."
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
