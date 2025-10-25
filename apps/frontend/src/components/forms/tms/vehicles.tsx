import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateVehicleInputSchema,
  UpdateVehicleInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createVehicleSchema = CreateVehicleInputSchema();
export const updateVehicleSchema = UpdateVehicleInputSchema();

export const createVehicleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createVehicleSchema>,
});

export const updateVehicleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateVehicleSchema>,
});

export const CreateVehicleForm = withForm({
  ...createVehicleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Vehicle</FieldLegend>
        <FieldDescription>Fill in the details for the new vehicle.</FieldDescription>
        <FieldGroup>
          {/* Basic Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Basic Information</FieldLegend>
            <FieldDescription>Vehicle identification and registration details.</FieldDescription>
            <FieldGroup>
              <form.AppField name="registrationNumber">
                {(field) => (
                  <field.InputField
                    label="Registration Number *"
                    description="Vehicle license plate or registration number."
                    placeholder="e.g., ABC-1234"
                  />
                )}
              </form.AppField>
              <form.AppField name="vin">
                {(field) => (
                  <field.InputField
                    label="VIN"
                    description="Vehicle Identification Number."
                    placeholder="e.g., WVWZZZ3C24E000001"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Vehicle Specifications Section */}
          <FieldSet>
            <FieldLegend variant="label">Vehicle Specifications</FieldLegend>
            <FieldDescription>Make, model, year, and capacity information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="make">
                  {(field) => (
                    <field.InputField
                      label="Make *"
                      description="Vehicle manufacturer (e.g., Volvo, Freightliner)."
                      placeholder="e.g., Volvo"
                    />
                  )}
                </form.AppField>
                <form.AppField name="model">
                  {(field) => (
                    <field.InputField
                      label="Model *"
                      description="Vehicle model name."
                      placeholder="e.g., FH16"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="year">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Year *"
                      description="Year of manufacture."
                      placeholder="2023"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status *"
                      description="Current vehicle status."
                      placeholder="e.g., Active, Maintenance, Retired"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Capacity Section */}
          <FieldSet>
            <FieldLegend variant="label">Capacity</FieldLegend>
            <FieldDescription>Vehicle volume and weight capacity.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="capacityVolume">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Volume Capacity *"
                      description="Maximum volume in cubic meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="capacityWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight Capacity *"
                      description="Maximum weight in kilograms."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Maintenance Section */}
          <FieldSet>
            <FieldLegend variant="label">Maintenance</FieldLegend>
            <FieldDescription>Odometer reading and maintenance tracking.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="currentMileage">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Current Mileage"
                      description="Current odometer reading in kilometers."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastMaintenanceDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Last Maintenance Date"
                      description="When the vehicle was last serviced."
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

export const UpdateVehicleForm = withForm({
  ...updateVehicleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Vehicle</FieldLegend>
        <FieldDescription>Update the details for the vehicle.</FieldDescription>
        <FieldGroup>
          {/* Basic Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Basic Information</FieldLegend>
            <FieldDescription>Update vehicle identification and registration details.</FieldDescription>
            <FieldGroup>
              <form.AppField name="registrationNumber">
                {(field) => (
                  <field.InputField
                    label="Registration Number"
                    description="Vehicle license plate or registration number."
                    placeholder="e.g., ABC-1234"
                  />
                )}
              </form.AppField>
              <form.AppField name="vin">
                {(field) => (
                  <field.InputField
                    label="VIN"
                    description="Vehicle Identification Number."
                    placeholder="e.g., WVWZZZ3C24E000001"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Vehicle Specifications Section */}
          <FieldSet>
            <FieldLegend variant="label">Vehicle Specifications</FieldLegend>
            <FieldDescription>Update make, model, year, and capacity information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="make">
                  {(field) => (
                    <field.InputField
                      label="Make"
                      description="Vehicle manufacturer (e.g., Volvo, Freightliner)."
                      placeholder="e.g., Volvo"
                    />
                  )}
                </form.AppField>
                <form.AppField name="model">
                  {(field) => (
                    <field.InputField
                      label="Model"
                      description="Vehicle model name."
                      placeholder="e.g., FH16"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="year">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Year"
                      description="Year of manufacture."
                      placeholder="2023"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="status">
                  {(field) => (
                    <field.InputField
                      label="Status"
                      description="Current vehicle status."
                      placeholder="e.g., Active, Maintenance, Retired"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Capacity Section */}
          <FieldSet>
            <FieldLegend variant="label">Capacity</FieldLegend>
            <FieldDescription>Update vehicle volume and weight capacity.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="capacityVolume">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Volume Capacity"
                      description="Maximum volume in cubic meters."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="capacityWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight Capacity"
                      description="Maximum weight in kilograms."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Maintenance Section */}
          <FieldSet>
            <FieldLegend variant="label">Maintenance</FieldLegend>
            <FieldDescription>Update odometer reading and maintenance tracking.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="currentMileage">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Current Mileage"
                      description="Current odometer reading in kilometers."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lastMaintenanceDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Last Maintenance Date"
                      description="When the vehicle was last serviced."
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
