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
        <FieldDescription>Fill in the details for the new geofence.</FieldDescription>
        <FieldGroup>
          {/* Geofence Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Geofence Information</FieldLegend>
            <FieldDescription>Name and geographic center point of the geofence.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="Name of the geofence location."
                    placeholder="e.g., Warehouse, Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Coordinates Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Coordinates</FieldLegend>
            <FieldDescription>Latitude and longitude of the geofence center.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude *"
                      description="Latitude coordinate."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude *"
                      description="Longitude coordinate."
                      placeholder="0.000000"
                      step="any"
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

export const UpdateGeofenceForm = withForm({
  ...updateGeofenceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Geofence</FieldLegend>
        <FieldDescription>Update the details for the geofence.</FieldDescription>
        <FieldGroup>
          {/* Geofence Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Geofence Information</FieldLegend>
            <FieldDescription>Update name and geographic center point of the geofence.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="Name of the geofence location."
                    placeholder="e.g., Warehouse, Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Coordinates Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Coordinates</FieldLegend>
            <FieldDescription>Update latitude and longitude of the geofence center.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate."
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
                      description="Longitude coordinate."
                      placeholder="0.000000"
                      step="any"
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
