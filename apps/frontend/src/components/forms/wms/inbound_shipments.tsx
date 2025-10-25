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
  SearchWarehousesQuery,
  SearchCompaniesQuery,
  execute,
} from "@packages/graphql/client";
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
          Create a new incoming shipment to warehouse.
        </FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link shipment to client and warehouse.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchCompaniesQuery,
                          { search: query || "" }
                        );
                        return data?.crm?.companies || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Client *"
                      description="Client or supplier sending this shipment."
                      placeholder="Search client..."
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
                      description="Destination warehouse for this shipment."
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
            <FieldDescription>
              Current status of the inbound shipment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current shipment status."
                    placeholder="e.g., In Transit, Received, Processing"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Expected and actual arrival dates.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expectedArrivalDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expected Arrival *"
                      description="When shipment is expected to arrive."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualArrivalDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Actual Arrival"
                      description="When shipment actually arrived."
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

export const UpdateInboundShipmentForm = withForm({
  ...updateInboundShipmentFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inbound Shipment</FieldLegend>
        <FieldDescription>Update inbound shipment details.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Update client and warehouse associations.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="clientId">
                  {(field) => (
                    <field.AsyncSelectField<{ label: string; value: string }>
                      fetcher={async (query) => {
                        const { data } = await execute(
                          "/api/graphql",
                          SearchCompaniesQuery,
                          { search: query || "" }
                        );
                        return data?.crm?.companies || [];
                      }}
                      renderOption={(option) => option.label}
                      getOptionValue={(option) => option.value}
                      getDisplayValue={(option) => option.label}
                      label="Client"
                      description="Client or supplier sending this shipment."
                      placeholder="Search client..."
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
                      description="Destination warehouse for this shipment."
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
            <FieldDescription>
              Update status of the inbound shipment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current shipment status."
                    placeholder="e.g., In Transit, Received, Processing"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>
              Update expected and actual arrival dates.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="expectedArrivalDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expected Arrival"
                      description="When shipment is expected to arrive."
                    />
                  )}
                </form.AppField>
                <form.AppField name="actualArrivalDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Actual Arrival"
                      description="When shipment actually arrived."
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
