import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import {
  Collections,
  TypedPocketBase,
  WarehouseManagementInboundShipmentItemsRecord,
  WarehouseManagementInboundShipmentsResponse,
  WarehouseManagementProductsResponse,
} from "@/lib/pb.types";
import {
  CreateInboundShipmentItemsSchema,
  UpdateInboundShipmentItemsSchema,
} from "@/pocketbase/schemas/warehouse-management/inbound-shipment-items";

export type InboundShipmentItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};

export const InboundShipmentItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<
    ReturnType<typeof UpdateInboundShipmentItemsSchema>
  >,
  props: {} as InboundShipmentItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* product - string (relation) */}
        <div className="col-span-full flex items-center gap-2.5 justify-between">
          <group.AppField name="product">
            {(field) => (
              <field.Field label="Product" description="Product in shipment">
                <field.RelationField<WarehouseManagementProductsResponse>
                  collectionName={Collections.WarehouseManagementProducts}
                  relationshipName="product"
                  renderOption={(item) => `${item.name}`}
                />
              </field.Field>
            )}
          </group.AppField>
          <Button onClick={props.onRemove} variant={"destructive"}>
            <Trash />
          </Button>
        </div>
        {/* expectedQuantity - number */}
        <group.AppField name="expectedQuantity">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Expected Qty"
              description="Expected quantity"
            >
              <field.NumberField />
            </field.Field>
          )}
        </group.AppField>
        {/* receivedQuantity - number */}
        <group.AppField name="receivedQuantity">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Received Qty"
              description="Received quantity"
            >
              <field.NumberField />
            </field.Field>
          )}
        </group.AppField>
        {/* discrepancyNotes - text */}
        <group.AppField name="discrepancyNotes">
          {(field) => (
            <field.Field
              className="col-span-4"
              label="Discrepancy Notes"
              description="Notes on any discrepancies"
            >
              <field.TextareaField />
            </field.Field>
          )}
        </group.AppField>
      </group.FieldSet>
    );
  },
});

export const CreateInboundShipmentItemsFormOptions = (
  pocketbase: TypedPocketBase
) =>
  formOptions({
    defaultValues: {
      inboundShipment: "",
      product: "",
      expectedQuantity: 0,
      receivedQuantity: 0,
      discrepancyNotes: "",
    } as z.infer<typeof CreateInboundShipmentItemsSchema>,
    onSubmit: async ({ value }) => {
      try {
        const created = await pocketbase
          .collection(Collections.WarehouseManagementInboundShipmentItems)
          .create(value as any);
        toast.success(`Inbound shipment item created successfully`);
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

export const UpdateInboundShipmentItemsFormOptions = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementInboundShipmentItemsRecord
) =>
  formOptions({
    defaultValues: {
      inboundShipment: record?.inboundShipment ?? "",
      product: record?.product ?? "",
      expectedQuantity: record?.expectedQuantity ?? 0,
      receivedQuantity: record?.receivedQuantity ?? 0,
      discrepancyNotes: record?.discrepancyNotes ?? "",
    } as z.infer<typeof UpdateInboundShipmentItemsSchema>,
    onSubmit: async ({ value }) => {
      if (!record?.id) {
        throw new Error("Record ID is required for updates");
      }
      try {
        const updated = await pocketbase
          .collection(Collections.WarehouseManagementInboundShipmentItems)
          .update(record.id, value as any);
        toast.success(`Inbound shipment item updated successfully`);
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
