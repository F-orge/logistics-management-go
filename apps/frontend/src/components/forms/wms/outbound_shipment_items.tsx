import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateOutboundShipmentItemInputSchema,
  UpdateOutboundShipmentItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createOutboundShipmentItemSchema = CreateOutboundShipmentItemInputSchema();
export const updateOutboundShipmentItemSchema = UpdateOutboundShipmentItemInputSchema();

export const createOutboundShipmentItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createOutboundShipmentItemSchema>,
});

export const updateOutboundShipmentItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateOutboundShipmentItemSchema>,
});

export const CreateOutboundShipmentItemForm = withForm({
  ...createOutboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Outbound Shipment Item</FieldLegend>
        <FieldDescription>
          Fill in the details for the new outbound shipment item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="outboundShipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderItemId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityShipped">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateOutboundShipmentItemForm = withForm({
  ...updateOutboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Outbound Shipment Item</FieldLegend>
        <FieldDescription>
          Update the details for the outbound shipment item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="outboundShipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderItemId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantityShipped">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
