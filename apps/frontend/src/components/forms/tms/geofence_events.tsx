import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateGeofenceEventInputSchema,
  UpdateGeofenceEventInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createGeofenceEventSchema = CreateGeofenceEventInputSchema();
export const updateGeofenceEventSchema = UpdateGeofenceEventInputSchema();

export const createGeofenceEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createGeofenceEventSchema>,
});

export const updateGeofenceEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateGeofenceEventSchema>,
});

export const CreateGeofenceEventForm = withForm({
  ...createGeofenceEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Geofence Event</FieldLegend>
        <FieldDescription>Fill in the details for the new geofence event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Event type and timestamp information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="eventType">
                {(field) => (
                  <field.InputField
                    label="Event Type *"
                    description="Type of geofence event (entry or exit)."
                    placeholder="e.g., Entry, Exit"
                  />
                )}
              </form.AppField>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When the event occurred."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link the event to a vehicle and geofence.</FieldDescription>
            <FieldGroup>
              <form.AppField name="vehicleId">
                {(field) => (
                  <field.InputField
                    label="Vehicle *"
                    description="The vehicle that triggered the event."
                    placeholder="Vehicle ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="geofenceId">
                {(field) => (
                  <field.InputField
                    label="Geofence *"
                    description="The geofence where the event occurred."
                    placeholder="Geofence ID"
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

export const UpdateGeofenceEventForm = withForm({
  ...updateGeofenceEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Geofence Event</FieldLegend>
        <FieldDescription>Update the details for the geofence event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Update event type and timestamp information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="eventType">
                {(field) => (
                  <field.InputField
                    label="Event Type"
                    description="Type of geofence event (entry or exit)."
                    placeholder="e.g., Entry, Exit"
                  />
                )}
              </form.AppField>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When the event occurred."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update vehicle and geofence associations.</FieldDescription>
            <FieldGroup>
              <form.AppField name="vehicleId">
                {(field) => (
                  <field.InputField
                    label="Vehicle"
                    description="The vehicle that triggered the event."
                    placeholder="Vehicle ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="geofenceId">
                {(field) => (
                  <field.InputField
                    label="Geofence"
                    description="The geofence where the event occurred."
                    placeholder="Geofence ID"
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
