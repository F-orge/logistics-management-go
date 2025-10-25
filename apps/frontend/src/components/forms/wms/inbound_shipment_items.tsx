import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInboundShipmentItemInputSchema,
  UpdateInboundShipmentItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInboundShipmentItemSchema = CreateInboundShipmentItemInputSchema();
export const updateInboundShipmentItemSchema = UpdateInboundShipmentItemInputSchema();

export const createInboundShipmentItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInboundShipmentItemSchema>,
});

export const updateInboundShipmentItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInboundShipmentItemSchema>,
});

export const CreateInboundShipmentItemForm = withForm({
  ...createInboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inbound Shipment Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new inbound shipment item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="inboundShipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expectedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="receivedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="discrepancyNotes">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInboundShipmentItemForm = withForm({
  ...updateInboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inbound Shipment Item</FieldLegend>
        <FieldDescription>
          Update the details for the inbound shipment item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="inboundShipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expectedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="receivedQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="discrepancyNotes">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
