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
} from "@packages/graphql/client/zod";
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
        <FieldDescription>
          Fill in the details for the new vehicle maintenance record.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Maintenance Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="serviceType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="cost">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the vehicle maintenance record.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Maintenance Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="serviceType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="cost">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="notes">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
