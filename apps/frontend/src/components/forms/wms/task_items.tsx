import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskItemInputSchema,
  UpdateTaskItemInputSchema,
  SearchWmsProductsQuery,
  SearchInventoryBatchesQuery,
  SearchLocationsQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createTaskItemSchema = CreateTaskItemInputSchema();
export const updateTaskItemSchema = UpdateTaskItemInputSchema();

export const createTaskItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskItemSchema>,
});

export const updateTaskItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskItemSchema>,
});

export const CreateTaskItemForm = withForm({
  ...createTaskItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task Item</FieldLegend>
        <FieldDescription>Add item line to warehouse task.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link item to task and product.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taskId">
                  {(field) => (
                    <field.InputField
                      label="Task *"
                      description="The task this item belongs to."
                      placeholder="Task ID"
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
                      description="The product for this task item."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchInventoryBatchesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.inventoryBatches || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Batch"
                      description="Product batch (optional)."
                      placeholder="Search batch..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceLocationId">
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
                      label="Source Location"
                      description="Source location for task."
                      placeholder="Search location..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="destinationLocationId">
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
                    label="Destination Location"
                    description="Destination location for task."
                    placeholder="Search location..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>
              Required and completed quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityRequired">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Required *"
                      description="Quantity required for task."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantityCompleted">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Completed"
                      description="Quantity completed so far."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>
              Lot number, serial numbers, and status.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lotNumber">
                  {(field) => (
                    <field.InputField
                      label="Lot Number"
                      description="Product lot number (optional)."
                      placeholder="Lot number"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Item status."
                      placeholder="e.g., Pending, In Progress, Completed"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serialNumbers">
                {(field) => (
                  <field.InputField
                    label="Serial Numbers"
                    description="Serial numbers (comma-separated, optional)."
                    placeholder="SN001, SN002, SN003"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Expiry & Timestamp Section */}
          <FieldSet>
            <FieldLegend variant="label">Expiry & Timestamp</FieldLegend>
            <FieldDescription>
              Expiration date and completion timestamp.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expiryDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiry Date"
                      description="Product expiration date (optional)."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When item was completed."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Notes</FieldLegend>
            <FieldDescription>Additional task item notes.</FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about this task item."
                    placeholder="Enter notes..."
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

export const UpdateTaskItemForm = withForm({
  ...updateTaskItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task Item</FieldLegend>
        <FieldDescription>Update item line in warehouse task.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update task, product, and location associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taskId">
                  {(field) => (
                    <field.InputField
                      label="Task"
                      description="The task this item belongs to."
                      placeholder="Task ID"
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
                      description="The product for this task item."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchInventoryBatchesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.inventoryBatches || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Batch"
                      description="Product batch (optional)."
                      placeholder="Search batch..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceLocationId">
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
                      label="Source Location"
                      description="Source location for task."
                      placeholder="Search location..."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="destinationLocationId">
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
                    label="Destination Location"
                    description="Destination location for task."
                    placeholder="Search location..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>
              Update required and completed quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantityRequired">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Required"
                      description="Quantity required for task."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="quantityCompleted">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity Completed"
                      description="Quantity completed so far."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>
              Update lot number, serial numbers, and status.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="lotNumber">
                  {(field) => (
                    <field.InputField
                      label="Lot Number"
                      description="Product lot number (optional)."
                      placeholder="Lot number"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Item status."
                      placeholder="e.g., Pending, In Progress, Completed"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serialNumbers">
                {(field) => (
                  <field.InputField
                    label="Serial Numbers"
                    description="Serial numbers (comma-separated, optional)."
                    placeholder="SN001, SN002, SN003"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Expiry & Timestamp Section */}
          <FieldSet>
            <FieldLegend variant="label">Expiry & Timestamp</FieldLegend>
            <FieldDescription>
              Update expiration date and completion timestamp.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expiryDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiry Date"
                      description="Product expiration date (optional)."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When item was completed."
                      placeholder="YYYY-MM-DDTHH:mm"
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
              Update additional task item notes.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about this task item."
                    placeholder="Enter notes..."
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
