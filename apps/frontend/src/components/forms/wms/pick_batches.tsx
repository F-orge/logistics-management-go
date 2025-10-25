import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePickBatchInputSchema,
  UpdatePickBatchInputSchema,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createPickBatchSchema = CreatePickBatchInputSchema();
export const updatePickBatchSchema = UpdatePickBatchInputSchema();

export const createPickBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPickBatchSchema>,
});

export const updatePickBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePickBatchSchema>,
});

export const CreatePickBatchForm = withForm({
  ...createPickBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Pick Batch</FieldLegend>
        <FieldDescription>
          Create a new picking batch for warehouse operations.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link batch to warehouse and assignment.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      description="Warehouse for this picking batch."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="assignedUserId">
                  {(field) => (
                    <field.InputField
                      label="Assigned User"
                      description="User assigned to this batch."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="waveId">
                {(field) => (
                  <field.InputField
                    label="Wave"
                    description="Wave ID this batch belongs to."
                    placeholder="Wave ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Batch Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Batch Details</FieldLegend>
            <FieldDescription>
              Batch number, status, and strategy.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchNumber">
                  {(field) => (
                    <field.InputField
                      label="Batch Number *"
                      description="Unique batch identifier."
                      placeholder="e.g., PICK-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Current batch status."
                      placeholder="e.g., Pending, In Progress, Complete"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="strategy">
                  {(field) => (
                    <field.InputField
                      label="Strategy"
                      description="Picking strategy (zone, wave, etc)."
                      placeholder="e.g., Zone Pick, Wave Pick"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority"
                      description="Batch priority level."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Constraints Section */}
          <FieldSet>
            <FieldLegend variant="label">Constraints</FieldLegend>
            <FieldDescription>Zone restrictions for picking.</FieldDescription>
            <FieldGroup>
              <form.AppField name="zoneRestrictions">
                {(field) => (
                  <field.TextAreaField
                    label="Zone Restrictions"
                    description="Restricted zones (comma-separated)."
                    placeholder="e.g., Zone A, Zone B"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing & Progress</FieldLegend>
            <FieldDescription>
              Duration estimates and completion tracking.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration"
                      description="Estimated time (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Actual Duration"
                      description="Actual time taken (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalItems">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Items"
                      description="Total items in batch."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedItems">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Completed Items"
                      description="Items completed."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamps</FieldLegend>
            <FieldDescription>
              When batch was started and completed.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Started At"
                      description="When batch picking started."
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When batch was completed."
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

export const UpdatePickBatchForm = withForm({
  ...updatePickBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Pick Batch</FieldLegend>
        <FieldDescription>Update picking batch details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update warehouse and assignment.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      description="Warehouse for this picking batch."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="assignedUserId">
                  {(field) => (
                    <field.InputField
                      label="Assigned User"
                      description="User assigned to this batch."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="waveId">
                {(field) => (
                  <field.InputField
                    label="Wave"
                    description="Wave ID this batch belongs to."
                    placeholder="Wave ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Batch Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Batch Details</FieldLegend>
            <FieldDescription>Update batch information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchNumber">
                  {(field) => (
                    <field.InputField
                      label="Batch Number"
                      description="Unique batch identifier."
                      placeholder="e.g., PICK-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Current batch status."
                      placeholder="e.g., Pending, In Progress, Complete"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="strategy">
                  {(field) => (
                    <field.InputField
                      label="Strategy"
                      description="Picking strategy (zone, wave, etc)."
                      placeholder="e.g., Zone Pick, Wave Pick"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority"
                      description="Batch priority level."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Constraints Section */}
          <FieldSet>
            <FieldLegend variant="label">Constraints</FieldLegend>
            <FieldDescription>Update zone restrictions.</FieldDescription>
            <FieldGroup>
              <form.AppField name="zoneRestrictions">
                {(field) => (
                  <field.TextAreaField
                    label="Zone Restrictions"
                    description="Restricted zones (comma-separated)."
                    placeholder="e.g., Zone A, Zone B"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timing Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing & Progress</FieldLegend>
            <FieldDescription>
              Update duration and completion tracking.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration"
                      description="Estimated time (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Actual Duration"
                      description="Actual time taken (minutes)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="totalItems">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Total Items"
                      description="Total items in batch."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedItems">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Completed Items"
                      description="Items completed."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamps Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamps</FieldLegend>
            <FieldDescription>
              Update start and completion times.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Started At"
                      description="When batch picking started."
                    />
                  )}
                </form.AppField>
                <form.AppField name="completedAt">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Completed At"
                      description="When batch was completed."
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
