import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateGeofenceInputSchema,
  UpdateGeofenceInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createGeofenceSchema = CreateGeofenceInputSchema();
export const updateGeofenceSchema = UpdateGeofenceInputSchema();

export const createGeofenceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createGeofenceSchema>,
});

export const updateGeofenceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateGeofenceSchema>,
});

export const CreateGeofenceForm = withForm({
  ...createGeofenceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Geofence</FieldLegend>
        <FieldDescription>
          Fill in the details for the new geofence.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Geofence Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateGeofenceForm = withForm({
  ...updateGeofenceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Geofence</FieldLegend>
        <FieldDescription>
          Update the details for the geofence.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Geofence Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
