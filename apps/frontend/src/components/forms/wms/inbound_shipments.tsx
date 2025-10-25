import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInboundShipmentInputSchema,
  UpdateInboundShipmentInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInboundShipmentSchema = CreateInboundShipmentInputSchema();
export const updateInboundShipmentSchema = UpdateInboundShipmentInputSchema();

export const createInboundShipmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInboundShipmentSchema>,
});

export const updateInboundShipmentFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInboundShipmentSchema>,
});

export const CreateInboundShipmentForm = withForm({
  ...createInboundShipmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inbound Shipment</FieldLegend>
        <FieldDescription>
          Fill in the details for the new inbound shipment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Shipment Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expectedArrivalDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="actualArrivalDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInboundShipmentForm = withForm({
  ...updateInboundShipmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inbound Shipment</FieldLegend>
        <FieldDescription>
          Update the details for the inbound shipment.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Shipment Details</FieldLegend>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expectedArrivalDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="actualArrivalDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
