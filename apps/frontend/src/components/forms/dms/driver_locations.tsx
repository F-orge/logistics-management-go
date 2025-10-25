import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDriverLocationInputSchema,
  UpdateDriverLocationInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDriverLocationSchema = CreateDriverLocationInputSchema();
export const updateDriverLocationSchema = UpdateDriverLocationInputSchema();

export const createDriverLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDriverLocationSchema>,
});

export const updateDriverLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDriverLocationSchema>,
});

export const CreateDriverLocationForm = withForm({
  ...createDriverLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Driver Location</FieldLegend>
        <FieldDescription>Fill in the details for the new driver location.</FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Geographic coordinates and accuracy information.</FieldDescription>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="altitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Altitude (m)"
                      description="Altitude in meters above sea level."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="accuracy">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Accuracy (m)"
                      description="Horizontal accuracy in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Movement Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Movement Information</FieldLegend>
            <FieldDescription>Speed and direction of movement.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="speedKmh">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Speed (km/h)"
                      description="Current speed in kilometers per hour."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="heading">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Heading (°)"
                      description="Direction of travel in degrees (0-360)."
                      placeholder="0.00"
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
            <FieldDescription>When this location was recorded and driver assignment.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When this location was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver *"
                    description="The driver whose location this is."
                    placeholder="Driver ID"
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

export const UpdateDriverLocationForm = withForm({
  ...updateDriverLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Driver Location</FieldLegend>
        <FieldDescription>Update the details for the driver location.</FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Update geographic coordinates and accuracy information.</FieldDescription>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="altitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Altitude (m)"
                      description="Altitude in meters above sea level."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="accuracy">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Accuracy (m)"
                      description="Horizontal accuracy in meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Movement Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Movement Information</FieldLegend>
            <FieldDescription>Update speed and direction of movement.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="speedKmh">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Speed (km/h)"
                      description="Current speed in kilometers per hour."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="heading">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Heading (°)"
                      description="Direction of travel in degrees (0-360)."
                      placeholder="0.00"
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
            <FieldDescription>Update timestamp and driver assignment.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When this location was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="driverId">
                {(field) => (
                  <field.InputField
                    label="Driver"
                    description="The driver whose location this is."
                    placeholder="Driver ID"
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
