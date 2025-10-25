import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateVehicleMaintenanceInputSchema,
  UpdateVehicleMaintenanceInputSchema,
  SearchVehiclesQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createVehicleMaintenanceSchema = CreateVehicleMaintenanceInputSchema();
export const updateVehicleMaintenanceSchema = UpdateVehicleMaintenanceInputSchema();

export const createVehicleMaintenanceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createVehicleMaintenanceSchema>,
});

export const updateVehicleMaintenanceFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateVehicleMaintenanceSchema>,
});

export const CreateVehicleMaintenanceForm = withForm({
  ...createVehicleMaintenanceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Vehicle Maintenance</FieldLegend>
        <FieldDescription>Fill in the details for the new vehicle maintenance record.</FieldDescription>
        <FieldGroup>
          {/* Maintenance Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Maintenance Details</FieldLegend>
            <FieldDescription>Service type and cost information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type *"
                    description="Type of maintenance performed."
                    placeholder="e.g., Oil Change, Tire Rotation, Inspection"
                  />
                )}
              </form.AppField>
              <form.AppField name="cost">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Cost *"
                    description="Cost of the maintenance service."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about the maintenance."
                    placeholder="Enter maintenance notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline & Relations</FieldLegend>
            <FieldDescription>Service date and associated vehicle.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Service Date *"
                    description="When the maintenance was performed."
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
                    description="The vehicle that was serviced."
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

export const UpdateVehicleMaintenanceForm = withForm({
  ...updateVehicleMaintenanceFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Vehicle Maintenance</FieldLegend>
        <FieldDescription>Update the details for the vehicle maintenance record.</FieldDescription>
        <FieldGroup>
          {/* Maintenance Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Maintenance Details</FieldLegend>
            <FieldDescription>Update service type and cost information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type"
                    description="Type of maintenance performed."
                    placeholder="e.g., Oil Change, Tire Rotation, Inspection"
                  />
                )}
              </form.AppField>
              <form.AppField name="cost">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Cost"
                    description="Cost of the maintenance service."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <form.AppField name="notes">
                {(field) => (
                  <field.InputField
                    label="Notes"
                    description="Additional notes about the maintenance."
                    placeholder="Enter maintenance notes..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline & Relations</FieldLegend>
            <FieldDescription>Update service date and vehicle association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Service Date"
                    description="When the maintenance was performed."
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
                    description="The vehicle that was serviced."
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
