import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTripInputSchema,
  UpdateTripInputSchema,
  SearchDriversQuery,
  SearchVehiclesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createTripSchema = CreateTripInputSchema();
export const updateTripSchema = UpdateTripInputSchema();

export const createTripFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTripSchema>,
});

export const updateTripFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTripSchema>,
});

export const CreateTripForm = withForm({
  ...createTripFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Trip</FieldLegend>
        <FieldDescription>
          Fill in the details for the new trip.
        </FieldDescription>
        <FieldGroup>
          {/* Trip Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Trip Assignment</FieldLegend>
            <FieldDescription>
              Driver and vehicle assigned to this trip.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDriversQuery,
                        { search: query || "" }
                      );
                      return data?.tms?.drivers || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Driver *"
                    description="The driver assigned to this trip."
                    placeholder="Search driver..."
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
                    description="The vehicle assigned to this trip."
                    placeholder="Search vehicle..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Trip Locations Section */}
          <FieldSet>
            <FieldLegend variant="label">Trip Locations</FieldLegend>
            <FieldDescription>
              Starting and ending locations for the trip.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="startLocation">
                {(field) => (
                  <field.InputField
                    label="Start Location *"
                    description="Where the trip begins."
                    placeholder="e.g., Warehouse Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="endLocation">
                {(field) => (
                  <field.InputField
                    label="End Location *"
                    description="Where the trip ends."
                    placeholder="e.g., Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Planned start and end times for the trip.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Start Time *"
                      description="When the trip starts."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="End Time *"
                      description="When the trip ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Current status of the trip.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current trip status."
                    placeholder="e.g., Planned, In Progress, Completed"
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

export const UpdateTripForm = withForm({
  ...updateTripFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Trip</FieldLegend>
        <FieldDescription>Update the details for the trip.</FieldDescription>
        <FieldGroup>
          {/* Trip Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Trip Assignment</FieldLegend>
            <FieldDescription>
              Update driver and vehicle assignment for this trip.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="driverId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDriversQuery,
                        { search: query || "" }
                      );
                      return data?.tms?.drivers || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Driver"
                    description="The driver assigned to this trip."
                    placeholder="Search driver..."
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
                    description="The vehicle assigned to this trip."
                    placeholder="Search vehicle..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Trip Locations Section */}
          <FieldSet>
            <FieldLegend variant="label">Trip Locations</FieldLegend>
            <FieldDescription>
              Update starting and ending locations for the trip.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="startLocation">
                {(field) => (
                  <field.InputField
                    label="Start Location"
                    description="Where the trip begins."
                    placeholder="e.g., Warehouse Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="endLocation">
                {(field) => (
                  <field.InputField
                    label="End Location"
                    description="Where the trip ends."
                    placeholder="e.g., Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Update planned start and end times for the trip.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="Start Time"
                      description="When the trip starts."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endTime">
                  {(field) => (
                    <field.InputField
                      type="datetime-local"
                      label="End Time"
                      description="When the trip ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>
              Update current status of the trip.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current trip status."
                    placeholder="e.g., Planned, In Progress, Completed"
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
