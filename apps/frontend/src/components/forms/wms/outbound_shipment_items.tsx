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
        <FieldDescription>Add product line items to outbound shipment.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link item to shipment, order, product, and batch.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="outboundShipmentId">
                  {(field) => (
                    <field.InputField
                      label="Outbound Shipment *"
                      description="The outbound shipment this item belongs to."
                      placeholder="Shipment ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="salesOrderItemId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order Item *"
                      description="The sales order line item."
                      placeholder="Order Item ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product *"
                      description="The product being shipped."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="batchId">
                  {(field) => (
                    <field.InputField
                      label="Batch"
                      description="Batch ID if applicable."
                      placeholder="Batch ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>Amount shipped.</FieldDescription>
            <FieldGroup>
              <form.AppField name="quantityShipped">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity Shipped *"
                    description="Amount of product shipped."
                    placeholder="0"
                    step="1"
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

export const UpdateOutboundShipmentItemForm = withForm({
  ...updateOutboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Outbound Shipment Item</FieldLegend>
        <FieldDescription>Update product line items in outbound shipment.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update shipment, order, product, and batch associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="outboundShipmentId">
                  {(field) => (
                    <field.InputField
                      label="Outbound Shipment"
                      description="The outbound shipment this item belongs to."
                      placeholder="Shipment ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="salesOrderItemId">
                  {(field) => (
                    <field.InputField
                      label="Sales Order Item"
                      description="The sales order line item."
                      placeholder="Order Item ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product"
                      description="The product being shipped."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="batchId">
                  {(field) => (
                    <field.InputField
                      label="Batch"
                      description="Batch ID if applicable."
                      placeholder="Batch ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantity</FieldLegend>
            <FieldDescription>Update amount shipped.</FieldDescription>
            <FieldGroup>
              <form.AppField name="quantityShipped">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Quantity Shipped"
                    description="Amount of product shipped."
                    placeholder="0"
                    step="1"
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
