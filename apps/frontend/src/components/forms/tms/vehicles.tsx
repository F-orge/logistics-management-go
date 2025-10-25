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
        <FieldDescription>
          Fill in the details for the new vehicle.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Vehicle Details</FieldLegend>
            <form.AppField name="registrationNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="model">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="capacityVolume">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="capacityWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="make">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="year">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="vin">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="currentMileage">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lastMaintenanceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the vehicle.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Vehicle Details</FieldLegend>
            <form.AppField name="registrationNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="model">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="capacityVolume">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="capacityWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="make">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="year">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="vin">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="currentMileage">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lastMaintenanceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
