import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateOutboundShipmentInputSchema,
  UpdateOutboundShipmentInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createOutboundShipmentSchema = CreateOutboundShipmentInputSchema();
export const updateOutboundShipmentSchema = UpdateOutboundShipmentInputSchema();

export const createOutboundShipmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createOutboundShipmentSchema>,
});

export const updateOutboundShipmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateOutboundShipmentSchema>,
});

export const CreateOutboundShipmentForm = withForm({
  ...createOutboundShipmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Outbound Shipment</FieldLegend>
        <FieldDescription>
          Fill in the details for the new outbound shipment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Shipment Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="trackingNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrier">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateOutboundShipmentForm = withForm({
  ...updateOutboundShipmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Outbound Shipment</FieldLegend>
        <FieldDescription>
          Update the details for the outbound shipment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Shipment Details</FieldLegend>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="trackingNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="carrier">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
