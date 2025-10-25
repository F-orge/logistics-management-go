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
        <FieldDescription>
          Fill in the details for the new geofence event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="geofenceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="eventType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the geofence event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="geofenceId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="eventType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
