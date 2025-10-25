import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskEventInputSchema,
  UpdateTaskEventInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTaskEventSchema = CreateTaskEventInputSchema();
export const updateTaskEventSchema = UpdateTaskEventInputSchema();

export const createTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskEventSchema>,
});

export const updateTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskEventSchema>,
});

export const CreateTaskEventForm = withForm({
  ...createTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task Event</FieldLegend>
        <FieldDescription>Fill in the details for the new task event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Event status and reason information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Status change for this event."
                    placeholder="e.g., Started, In Progress, Completed, Failed"
                  />
                )}
              </form.AppField>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for the status change."
                    placeholder="e.g., Traffic delay, Customer not available"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about this event."
                    placeholder="Any additional notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Geographic location where this event occurred.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>When this event occurred and associated delivery task.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.InputField
                    label="Delivery Task *"
                    description="The delivery task this event is associated with."
                    placeholder="Delivery Task ID"
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

export const UpdateTaskEventForm = withForm({
  ...updateTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task Event</FieldLegend>
        <FieldDescription>Update the details for the task event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Update event status and reason information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Status change for this event."
                    placeholder="e.g., Started, In Progress, Completed, Failed"
                  />
                )}
              </form.AppField>
              <form.AppField name="reason">
                {(field) => (
                  <field.InputField
                    label="Reason"
                    description="Reason for the status change."
                    placeholder="e.g., Traffic delay, Customer not available"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about this event."
                    placeholder="Any additional notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Update geographic location where this event occurred.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of event location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>Update timestamp and associated delivery task.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.InputField
                    label="Delivery Task"
                    description="The delivery task this event is associated with."
                    placeholder="Delivery Task ID"
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
