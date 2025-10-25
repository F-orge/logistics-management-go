import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateLocationInputSchema,
  UpdateLocationInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createLocationSchema = CreateLocationInputSchema();
export const updateLocationSchema = UpdateLocationInputSchema();

export const createLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createLocationSchema>,
});

export const updateLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateLocationSchema>,
});

export const CreateLocationForm = withForm({
  ...createLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Location</FieldLegend>
        <FieldDescription>
          Fill in the details for the new location.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Location Details</FieldLegend>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="parentLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="barcode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="level">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="path">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="maxWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxVolume">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxPallets">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="xCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="yCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="zCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="isPickable">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isReceivable">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="temperatureControlled">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="hazmatApproved">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateLocationForm = withForm({
  ...updateLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Location</FieldLegend>
        <FieldDescription>
          Update the details for the location.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Location Details</FieldLegend>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="parentLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="barcode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="level">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="path">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="maxWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxVolume">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxPallets">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="xCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="yCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="zCoordinate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="isPickable">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isReceivable">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="temperatureControlled">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="hazmatApproved">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
