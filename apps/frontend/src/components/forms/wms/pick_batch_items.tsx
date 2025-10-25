import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePickBatchItemInputSchema,
  UpdatePickBatchItemInputSchema,
  SearchSalesOrdersQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createPickBatchItemSchema = CreatePickBatchItemInputSchema();
export const updatePickBatchItemSchema = UpdatePickBatchItemInputSchema();

export const createPickBatchItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPickBatchItemSchema>,
});

export const updatePickBatchItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePickBatchItemSchema>,
});

export const CreatePickBatchItemForm = withForm({
  ...createPickBatchItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Pick Batch Item</FieldLegend>
        <FieldDescription>Add sales order to pick batch.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link batch item to batch and sales order.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="pickBatchId">
                  {(field) => (
                    <field.InputField
                      label="Pick Batch *"
                      description="The pick batch this item belongs to."
                      placeholder="Batch ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchSalesOrdersQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.salesOrders || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Sales Order *"
                      description="The sales order for this batch item."
                      placeholder="Search sales order..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing</FieldLegend>
            <FieldDescription>
              Priority and estimated/actual pick time.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="orderPriority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Order Priority *"
                      description="Priority level (higher = more urgent)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedPickTime">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Pick Time *"
                      description="Estimated time to pick (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="actualPickTime">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Actual Pick Time"
                    description="Actual time taken to pick (minutes)."
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

export const UpdatePickBatchItemForm = withForm({
  ...updatePickBatchItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Pick Batch Item</FieldLegend>
        <FieldDescription>Update sales order in pick batch.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update batch and sales order associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="pickBatchId">
                  {(field) => (
                    <field.InputField
                      label="Pick Batch"
                      description="The pick batch this item belongs to."
                      placeholder="Batch ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchSalesOrdersQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.salesOrders || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Sales Order"
                      description="The sales order for this batch item."
                      placeholder="Search sales order..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing</FieldLegend>
            <FieldDescription>
              Update priority and timing information.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="orderPriority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Order Priority"
                      description="Priority level (higher = more urgent)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="estimatedPickTime">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Pick Time"
                      description="Estimated time to pick (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="actualPickTime">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Actual Pick Time"
                    description="Actual time taken to pick (minutes)."
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
