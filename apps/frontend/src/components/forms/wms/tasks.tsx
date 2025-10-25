import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskInputSchema,
  UpdateTaskInputSchema,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createTaskSchema = CreateTaskInputSchema();
export const updateTaskSchema = UpdateTaskInputSchema();

export const createTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskSchema>,
});

export const updateTaskFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskSchema>,
});

export const CreateTaskForm = withForm({
  ...createTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task</FieldLegend>
        <FieldDescription>Create a new warehouse task.</FieldDescription>
        <FieldGroup>
          {/* Task Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Task Details</FieldLegend>
            <FieldDescription>
              Task number, type, and assignment.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taskNumber">
                  {(field) => (
                    <field.InputField
                      label="Task Number *"
                      description="Unique task identifier."
                      placeholder="e.g., TASK-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="type">
                  {(field) => (
                    <field.InputField
                      label="Type *"
                      description="Task type (pick, pack, receive, etc)."
                      placeholder="e.g., Pick, Pack, Receive"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Task status."
                      placeholder="e.g., Pending, In Progress, Completed"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      label="Priority *"
                      description="Task priority level."
                      placeholder="e.g., Low, Medium, High, Urgent"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link to warehouse, user, and batch.
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
                      description="Warehouse for this task."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="userId">
                  {(field) => (
                    <field.InputField
                      label="Assigned User"
                      description="User assigned to task."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="pickBatchId">
                {(field) => (
                  <field.InputField
                    label="Pick Batch"
                    description="Associated pick batch (optional)."
                    placeholder="Pick Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Source & Entity Section */}
          <FieldSet>
            <FieldLegend variant="label">Source & Entity</FieldLegend>
            <FieldDescription>
              Source entity and type for task.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceEntityId">
                  {(field) => (
                    <field.InputField
                      label="Source Entity ID"
                      description="ID of source entity."
                      placeholder="Entity ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceEntityType">
                  {(field) => (
                    <field.InputField
                      label="Source Entity Type"
                      description="Type of source entity."
                      placeholder="e.g., SalesOrder, InboundShipment"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timing & Progress Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing & Progress</FieldLegend>
            <FieldDescription>
              Duration estimates and progress tracking.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration (min)"
                      description="Estimated completion time in minutes."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Actual Duration (min)"
                      description="Actual completion time in minutes."
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
            <FieldDescription>Task start and end times.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Start Time"
                      description="When task started."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="endTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="End Time"
                      description="When task ended."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Instructions & Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Instructions & Notes</FieldLegend>
            <FieldDescription>
              Task instructions and additional notes.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="instructions">
                {(field) => (
                  <field.TextAreaField
                    label="Instructions"
                    description="Detailed task instructions."
                    placeholder="Enter task instructions..."
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional task notes."
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

export const UpdateTaskForm = withForm({
  ...updateTaskFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task</FieldLegend>
        <FieldDescription>Update warehouse task details.</FieldDescription>
        <FieldGroup>
          {/* Task Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Task Details</FieldLegend>
            <FieldDescription>
              Update task number, type, and priority.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="taskNumber">
                  {(field) => (
                    <field.InputField
                      label="Task Number"
                      description="Unique task identifier."
                      placeholder="e.g., TASK-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="type">
                  {(field) => (
                    <field.InputField
                      label="Type"
                      description="Task type (pick, pack, receive, etc)."
                      placeholder="e.g., Pick, Pack, Receive"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Task status."
                      placeholder="e.g., Pending, In Progress, Completed"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      label="Priority"
                      description="Task priority level."
                      placeholder="e.g., Low, Medium, High, Urgent"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update warehouse, user, and batch associations.
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
                      description="Warehouse for this task."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="userId">
                  {(field) => (
                    <field.InputField
                      label="Assigned User"
                      description="User assigned to task."
                      placeholder="User ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="pickBatchId">
                {(field) => (
                  <field.InputField
                    label="Pick Batch"
                    description="Associated pick batch (optional)."
                    placeholder="Pick Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Source & Entity Section */}
          <FieldSet>
            <FieldLegend variant="label">Source & Entity</FieldLegend>
            <FieldDescription>Update source entity and type.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="sourceEntityId">
                  {(field) => (
                    <field.InputField
                      label="Source Entity ID"
                      description="ID of source entity."
                      placeholder="Entity ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sourceEntityType">
                  {(field) => (
                    <field.InputField
                      label="Source Entity Type"
                      description="Type of source entity."
                      placeholder="e.g., SalesOrder, InboundShipment"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timing & Progress Section */}
          <FieldSet>
            <FieldLegend variant="label">Timing & Progress</FieldLegend>
            <FieldDescription>Update duration estimates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="estimatedDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Estimated Duration (min)"
                      description="Estimated completion time in minutes."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualDuration">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Actual Duration (min)"
                      description="Actual completion time in minutes."
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
              Update task start and end times.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Start Time"
                      description="When task started."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
                <form.AppField name="endTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="End Time"
                      description="When task ended."
                      placeholder="YYYY-MM-DDTHH:mm"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Instructions & Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Instructions & Notes</FieldLegend>
            <FieldDescription>
              Update task instructions and notes.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="instructions">
                {(field) => (
                  <field.TextAreaField
                    label="Instructions"
                    description="Detailed task instructions."
                    placeholder="Enter task instructions..."
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Additional task notes."
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
