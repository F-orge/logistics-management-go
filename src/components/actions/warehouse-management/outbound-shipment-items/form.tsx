import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withFieldGroup } from "@/components/ui/forms";
import {
  Collections,
  TypedPocketBase,
  WarehouseManagementInventoryBatchesResponse,
  WarehouseManagementOutboundShipmentItemsRecord,
  WarehouseManagementOutboundShipmentsResponse,
  WarehouseManagementProductsResponse,
  WarehouseManagementSalesOrderItemsResponse,
} from "@/lib/pb.types";
import {
  CreateOutboundShipmentItemsSchema,
  UpdateOutboundShipmentItemsSchema,
} from "@/pocketbase/schemas/warehouse-management/outbound-shipment-items";

export type OutboundShipmentItemsFormProps = {
  action?: "create" | "edit";
};

export const OutboundShipmentItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<
    ReturnType<typeof UpdateOutboundShipmentItemsSchema>
  >,
  props: {} as OutboundShipmentItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* outboundShipment - string (relation) */}
        <group.AppField name="outboundShipment">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Outbound Shipment"
              description="Parent shipment"
            >
              <field.RelationField<WarehouseManagementOutboundShipmentsResponse>
                collectionName={
                  Collections.WarehouseManagementOutboundShipments
                }
                relationshipName="outboundShipment"
                renderOption={(item) => `${item.trackingNumber}`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* salesOrderItem - string (relation) */}
        <group.AppField name="salesOrderItem">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Sales Order Item"
              description="Item from sales order"
            >
              <field.RelationField<WarehouseManagementSalesOrderItemsResponse>
                collectionName={Collections.WarehouseManagementSalesOrderItems}
                relationshipName="salesOrderItem"
                renderOption={(item) => `${item.id}`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* product - string (relation) */}
        <group.AppField name="product">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Product"
              description="Product"
            >
              <field.RelationField<WarehouseManagementProductsResponse>
                collectionName={Collections.WarehouseManagementProducts}
                relationshipName="product"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* batch - string (relation) */}
        <group.AppField name="batch">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Batch"
              description="Inventory batch"
            >
              <field.RelationField<WarehouseManagementInventoryBatchesResponse>
                collectionName={Collections.WarehouseManagementInventoryBatches}
                relationshipName="batch"
                renderOption={(item) => `${item.batchNumber}`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* quantityShipped - number */}
        <group.AppField name="quantityShipped">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Quantity Shipped"
              description="Quantity shipped"
            >
              <field.NumberField />
            </field.Field>
          )}
        </group.AppField>
      </group.FieldSet>
    );
  },
});

export const CreateOutboundShipmentItemsFormOptions = (
  pocketbase: TypedPocketBase
) =>
  formOptions({
    defaultValues: {
      outboundShipment: "",
      salesOrderItem: "",
      product: "",
      batch: "",
      quantityShipped: 0,
    } as z.infer<typeof CreateOutboundShipmentItemsSchema>,
    onSubmit: async ({ value }) => {
      try {
        const created = await pocketbase
          .collection(Collections.WarehouseManagementOutboundShipmentItems)
          .create(value as any);
        toast.success(`Outbound shipment item created successfully`);
        return created;
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(error.message);
          throw error;
        }
        throw error;
      }
    },
  });

export const UpdateOutboundShipmentItemsFormOptions = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementOutboundShipmentItemsRecord
) =>
  formOptions({
    defaultValues: {
      outboundShipment: record?.outboundShipment ?? "",
      salesOrderItem: record?.salesOrderItem ?? "",
      product: record?.product ?? "",
      batch: record?.batch ?? "",
      quantityShipped: record?.quantityShipped ?? 0,
    } as z.infer<typeof UpdateOutboundShipmentItemsSchema>,
    onSubmit: async ({ value }) => {
      if (!record?.id) {
        throw new Error("Record ID is required for updates");
      }
      try {
        const updated = await pocketbase
          .collection(Collections.WarehouseManagementOutboundShipmentItems)
          .update(record.id, value as any);
        toast.success(`Outbound shipment item updated successfully`);
        return updated;
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(error.message);
          throw error;
        }
        throw error;
      }
    },
  });
