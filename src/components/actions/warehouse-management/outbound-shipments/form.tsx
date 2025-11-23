import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  TransportManagementCarriersResponse,
  TypedPocketBase,
  WarehouseManagementOutboundShipmentsRecord,
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import {
  CreateOutboundShipmentsSchema,
  OutboundShipmentsSchema,
  UpdateOutboundShipmentsSchema,
} from "@/pocketbase/schemas/warehouse-management/outbound-shipments";

export type OutboundShipmentsFormProps = {
  action?: "create" | "edit";
};

export const OutboundShipmentsForm = withForm({
  defaultValues: {} as z.infer<typeof OutboundShipmentsSchema>,
  props: {} as OutboundShipmentsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* salesOrder - string (relation) */}
        <form.AppField name="salesOrder">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Sales Order"
              description="Sales order"
            >
              <field.RelationField<WarehouseManagementSalesOrdersResponse>
                collectionName={Collections.WarehouseManagementSalesOrders}
                relationshipName="salesOrder"
                renderOption={(item) => `${item.orderNumber}`}
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* warehouse - string (relation) */}
        <form.AppField name="warehouse">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Warehouse"
              description="Warehouse"
            >
              <field.RelationField<WarehouseManagementWarehousesResponse>
                collectionName={Collections.WarehouseManagementWarehouses}
                relationshipName="warehouse"
                renderOption={(item) => `${item.name}`}
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* status - enum */}
        <form.AppField name="status">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Status"
              description="Shipment status"
            >
              <field.SelectField
                options={[
                  { value: "picking", label: "Picking" },
                  { value: "packed", label: "Packed" },
                  { value: "shipped", label: "Shipped" },
                  { value: "delivered", label: "Delivered" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* trackingNumber - string */}
        <form.AppField name="trackingNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Tracking Number"
              description="Shipment tracking number"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* carrier - string (relation) */}
        <form.AppField name="carrier">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Carrier"
              description="Shipping carrier"
            >
              <field.RelationField<TransportManagementCarriersResponse>
                collectionName={Collections.TransportManagementCarriers}
                relationshipName="carrier"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateOutboundShipmentsFormOption = (
  pocketbase: TypedPocketBase
) =>
  formOptions({
    defaultValues: {
      salesOrder: undefined,
      warehouse: undefined,
      status: undefined,
      trackingNumber: "",
      carrier: undefined,
    } as Partial<z.infer<ReturnType<typeof CreateOutboundShipmentsSchema>>>,
    validators: {
      onSubmitAsync: CreateOutboundShipmentsSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementOutboundShipments)
          .create(value);

        toast.success("Outbound shipment created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create shipment: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateOutboundShipmentsFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementOutboundShipmentsRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateOutboundShipmentsSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateOutboundShipmentsSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementOutboundShipments)
          .update(record?.id!, value);

        toast.success("Outbound shipment updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update shipment: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
