import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReturnItemInputSchema,
  UpdateReturnItemInputSchema,
  SearchWmsProductsQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createReturnItemSchema = CreateReturnItemInputSchema();
export const updateReturnItemSchema = UpdateReturnItemInputSchema();

export const createReturnItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReturnItemSchema>,
});

export const updateReturnItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReturnItemSchema>,
});

export const CreateReturnItemForm = withForm({
  ...createReturnItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Return Item</FieldLegend>
        <FieldDescription>Add item line to return.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link item to return and product.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="returnId">
                  {(field) => (
                    <field.InputField
                      label="Return *"
                      description="The return this item belongs to."
                      placeholder="Return ID"
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
                      description="The product being returned."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity & Condition Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity & Condition</FieldLegend>
            <FieldDescription>
              Expected and received quantities, product condition.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityExpected">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Expected *"
                      description="Expected return quantity."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantityReceived">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Received *"
                      description="Actual received quantity."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="condition">
                {(field) => (
                  <field.InputField
                    label="Condition *"
                    description="Product condition upon return."
                    placeholder="e.g., Good, Damaged, Defective"
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

export const UpdateReturnItemForm = withForm({
  ...updateReturnItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Return Item</FieldLegend>
        <FieldDescription>Update item line in return.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update return and product associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="returnId">
                  {(field) => (
                    <field.InputField
                      label="Return"
                      description="The return this item belongs to."
                      placeholder="Return ID"
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
                      description="The product being returned."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity & Condition Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity & Condition</FieldLegend>
            <FieldDescription>
              Update quantities and product condition.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityExpected">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Expected"
                      description="Expected return quantity."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantityReceived">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Received"
                      description="Actual received quantity."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="condition">
                {(field) => (
                  <field.InputField
                    label="Condition"
                    description="Product condition upon return."
                    placeholder="e.g., Good, Damaged, Defective"
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
