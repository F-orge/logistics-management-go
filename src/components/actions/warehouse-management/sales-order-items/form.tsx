import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { withFieldGroup } from "@/components/ui/forms";
import {
  Collections,
  TypedPocketBase,
  WarehouseManagementProductsResponse,
  WarehouseManagementSalesOrderItemsRecord,
  WarehouseManagementSalesOrdersResponse,
} from "@/lib/pb.types";
import {
  CreateSalesOrderItemsSchema,
  UpdateSalesOrderItemsSchema,
} from "@/pocketbase/schemas/warehouse-management/sales-order-items";

export type SalesOrderItemsFormProps = {
  action?: "create" | "edit";
  onRemove?: () => void;
};

export const SalesOrderItemsForm = withFieldGroup({
  defaultValues: {} as z.infer<ReturnType<typeof UpdateSalesOrderItemsSchema>>,
  props: {} as SalesOrderItemsFormProps,
  render: ({ group, ...props }) => {
    return (
      <group.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* salesOrder - string (relation) */}
        <group.AppField name="salesOrder">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Sales Order"
              description="Parent sales order"
            >
              <field.RelationField<WarehouseManagementSalesOrdersResponse>
                collectionName={Collections.WarehouseManagementSalesOrders}
                relationshipName="salesOrder"
                renderOption={(item) => `${item.orderNumber}`}
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
              description="Ordered product"
            >
              <field.RelationField<WarehouseManagementProductsResponse>
                collectionName={Collections.WarehouseManagementProducts}
                relationshipName="product"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </group.AppField>
        {/* quantityOrdered - number */}
        <group.AppField name="quantityOrdered">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Quantity"
              description="Quantity ordered"
            >
              <field.NumberField />
            </field.Field>
          )}
        </group.AppField>
        {props.onRemove && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={props.onRemove}
            className="col-span-full"
          >
            Remove Item
          </Button>
        )}
      </group.FieldSet>
    );
  },
});

export const CreateSalesOrderItemsFormOptions = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      salesOrder: "",
      product: "",
      quantityOrdered: 0,
    } as z.infer<typeof CreateSalesOrderItemsSchema>,
    onSubmit: async ({ value }) => {
      try {
        const created = await pocketbase
          .collection(Collections.WarehouseManagementSalesOrderItems)
          .create(value as any);
        toast.success(`Sales order item created successfully`);
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

export const UpdateSalesOrderItemsFormOptions = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementSalesOrderItemsRecord
) =>
  formOptions({
    defaultValues: {
      salesOrder: record?.salesOrder ?? "",
      product: record?.product ?? "",
      quantityOrdered: record?.quantityOrdered ?? 0,
    } as z.infer<typeof UpdateSalesOrderItemsSchema>,
    onSubmit: async ({ value }) => {
      if (!record?.id) {
        throw new Error("Record ID is required for updates");
      }
      try {
        const updated = await pocketbase
          .collection(Collections.WarehouseManagementSalesOrderItems)
          .update(record.id, value as any);
        toast.success(`Sales order item updated successfully`);
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
