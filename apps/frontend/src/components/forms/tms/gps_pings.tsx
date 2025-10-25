import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateGpsPingInputSchema,
  UpdateGpsPingInputSchema,
  SearchVehiclesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createGpsPingSchema = CreateGpsPingInputSchema();
export const updateGpsPingSchema = UpdateGpsPingInputSchema();

export const createGpsPingFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createGpsPingSchema>,
});

export const updateGpsPingFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateGpsPingSchema>,
});

export const CreateGpsPingForm = withForm({
  ...createGpsPingFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create GPS Ping</FieldLegend>
        <FieldDescription>
          Fill in the details for the new GPS ping.
        </FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Geographic coordinates of the vehicle location.
            </FieldDescription>
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

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              When the location was recorded and which vehicle.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When this GPS location was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="vehicleId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchVehiclesQuery,
                        { search: query || "" }
                      );
                      return data?.tms?.vehicles || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Vehicle *"
                    description="The vehicle that sent this ping."
                    placeholder="Search vehicle..."
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

export const UpdateGpsPingForm = withForm({
  ...updateGpsPingFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update GPS Ping</FieldLegend>
        <FieldDescription>
          Update the details for the GPS ping.
        </FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Update geographic coordinates of the vehicle location.
            </FieldDescription>
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

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              Update the timestamp and vehicle association.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When this GPS location was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="vehicleId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchVehiclesQuery,
                        { search: query || "" }
                      );
                      return data?.tms?.vehicles || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Vehicle"
                    description="The vehicle that sent this ping."
                    placeholder="Search vehicle..."
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
