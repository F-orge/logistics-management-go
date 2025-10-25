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
  SearchSalesOrdersQuery,
  SearchWarehousesQuery,
  execute,
} from "@packages/graphql/client";
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
          Create a new outgoing shipment from warehouse.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link shipment to sales order and warehouse.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchSalesOrdersQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.salesOrders || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Sales Order *"
                      description="The sales order for this shipment."
                      placeholder="Search sales order..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWarehousesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.warehouses || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Warehouse *"
                      description="Warehouse shipping from."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Current status of the shipment.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current shipment status."
                    placeholder="e.g., Pending, Shipped, Delivered"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Carrier Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Carrier Information</FieldLegend>
            <FieldDescription>
              Shipping carrier and tracking details.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="trackingNumber">
                  {(field) => (
                    <field.InputField
                      label="Tracking Number"
                      description="Carrier tracking number."
                      placeholder="e.g., 1Z999AA10123456784"
                    />
                  )}
                </form.AppField>
                <form.AppField name="carrier">
                  {(field) => (
                    <field.InputField
                      label="Carrier"
                      description="Shipping carrier name."
                      placeholder="e.g., FedEx, UPS, DHL"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
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
        <FieldDescription>Update outbound shipment details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update sales order and warehouse associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="salesOrderId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchSalesOrdersQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.salesOrders || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Sales Order"
                      description="The sales order for this shipment."
                      placeholder="Search sales order..."
                    />
                  )}
                </form.AppField>
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchWarehousesQuery,
                          { search: query || "" }
                        );
                        return data?.wms?.warehouses || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Warehouse"
                      description="Warehouse shipping from."
                      placeholder="Search warehouse..."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Update shipment status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current shipment status."
                    placeholder="e.g., Pending, Shipped, Delivered"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Carrier Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Carrier Information</FieldLegend>
            <FieldDescription>
              Update shipping carrier and tracking details.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="trackingNumber">
                  {(field) => (
                    <field.InputField
                      label="Tracking Number"
                      description="Carrier tracking number."
                      placeholder="e.g., 1Z999AA10123456784"
                    />
                  )}
                </form.AppField>
                <form.AppField name="carrier">
                  {(field) => (
                    <field.InputField
                      label="Carrier"
                      description="Shipping carrier name."
                      placeholder="e.g., FedEx, UPS, DHL"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
