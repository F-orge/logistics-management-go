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
  SearchWmsProductsQuery,
  execute,
} from "@packages/graphql/client";
import z from "zod";

export const createInboundShipmentItemSchema =
  CreateInboundShipmentItemInputSchema();
export const updateInboundShipmentItemSchema =
  UpdateInboundShipmentItemInputSchema();

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
          Add product line items to inbound shipment.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link item to shipment and product.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="inboundShipmentId">
                  {(field) => (
                    <field.InputField
                      label="Inbound Shipment *"
                      description="The inbound shipment this item belongs to."
                      placeholder="Enter shipment ID..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWmsProductsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.wmsProducts || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Product *"
                      description="The product in this line item."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantities</FieldLegend>
            <FieldDescription>
              Expected and actual received quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expectedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Expected Quantity *"
                      description="Quantity expected to receive."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="receivedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Received Quantity *"
                      description="Actual quantity received."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Discrepancy Notes</FieldLegend>
            <FieldDescription>
              Notes about any quantity discrepancies.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="discrepancyNotes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Details about quantity differences or issues."
                    placeholder="Enter discrepancy notes..."
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

export const UpdateInboundShipmentItemForm = withForm({
  ...updateInboundShipmentItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inbound Shipment Item</FieldLegend>
        <FieldDescription>
          Update product line items in inbound shipment.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update shipment and product associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="inboundShipmentId">
                  {(field) => (
                    <field.InputField
                      label="Inbound Shipment"
                      description="The inbound shipment this item belongs to."
                      placeholder="Enter shipment ID..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWmsProductsQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.wmsProducts || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Product"
                      description="The product in this line item."
                      placeholder="Search product..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Quantity Section */}
          <FieldSet>
            <FieldLegend variant="label">Quantities</FieldLegend>
            <FieldDescription>
              Update expected and actual received quantities.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expectedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Expected Quantity"
                      description="Quantity expected to receive."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="receivedQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Received Quantity"
                      description="Actual quantity received."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Notes Section */}
          <FieldSet>
            <FieldLegend variant="label">Discrepancy Notes</FieldLegend>
            <FieldDescription>
              Update notes about quantity discrepancies.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="discrepancyNotes">
                {(field) => (
                  <field.TextAreaField
                    label="Notes"
                    description="Details about quantity differences or issues."
                    placeholder="Enter discrepancy notes..."
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
