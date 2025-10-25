import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateShipmentLegInputSchema,
  UpdateShipmentLegInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createShipmentLegSchema = CreateShipmentLegInputSchema();
export const updateShipmentLegSchema = UpdateShipmentLegInputSchema();

export const createShipmentLegFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createShipmentLegSchema>,
});

export const updateShipmentLegFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateShipmentLegSchema>,
});

export const CreateShipmentLegForm = withForm({
  ...createShipmentLegFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Shipment Leg</FieldLegend>
        <FieldDescription>
          Fill in the details for the new shipment leg.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Leg Details</FieldLegend>
            <form.AppField name="shipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="legSequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="internalTripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateShipmentLegForm = withForm({
  ...updateShipmentLegFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Shipment Leg</FieldLegend>
        <FieldDescription>
          Update the details for the shipment leg.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Leg Details</FieldLegend>
            <form.AppField name="shipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="legSequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="internalTripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
