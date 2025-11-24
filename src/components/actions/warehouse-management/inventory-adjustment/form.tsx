import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  TypedPocketBase,
  UsersResponse,
  WarehouseManagementInventoryAdjustmentRecord,
  WarehouseManagementProductsResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import {
  CreateInventoryAdjustmentSchema,
  UpdateInventoryAdjustmentSchema,
} from "@/pocketbase/schemas/warehouse-management/inventory-adjustment";

export type InventoryAdjustmentFormProps = {
  action?: "create" | "edit";
};

export const InventoryAdjustmentForm = withForm({
  defaultValues: {} as z.infer<
    ReturnType<typeof UpdateInventoryAdjustmentSchema>
  >,
  props: {} as InventoryAdjustmentFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* product - string (relation) */}
        <form.AppField name="product">
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
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* user - string (relation) */}
        <form.AppField name="user">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="User"
              description="User making adjustment"
            >
              <field.RelationField<UsersResponse>
                collectionName={Collections.Users}
                relationshipName="user"
                renderOption={(item) => `${item.name}`}
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* quantityChange - number */}
        <form.AppField name="quantityChange">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Quantity Change"
              description="Quantity to adjust (positive or negative)"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* reason - enum */}
        <form.AppField name="reason">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Reason"
              description="Reason for adjustment"
            >
              <field.SelectField
                options={[
                  { value: "cycle-count", label: "Cycle Count" },
                  { value: "damaged-goods", label: "Damaged Goods" },
                  { value: "theft", label: "Theft" },
                  { value: "expired", label: "Expired" },
                  { value: "return-to-vendor", label: "Return to Vendor" },
                  { value: "manual-correction", label: "Manual Correction" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* notes - rich text */}
        <form.AppField name="notes">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Notes"
              description="Additional notes"
            >
              <field.TextareaField />
            </field.Field>
          )}
        </form.AppField>
        {/* warehouse - string (relation) */}
        <form.AppField name="warehouse">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Warehouse"
              description="Warehouse where adjustment occurred"
            >
              <field.RelationField<WarehouseManagementWarehousesResponse>
                collectionName={Collections.WarehouseManagementWarehouses}
                relationshipName="warehouse"
                renderOption={(item) => item.name as string}
                disabled={props.action === "edit"}
              />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateInventoryAdjustmentFormOption = (
  pocketbase: TypedPocketBase
) =>
  formOptions({
    defaultValues: {
      product: undefined,
      user: undefined,
      quantityChange: 0,
      reason: undefined,
      notes: "",
      warehouse: undefined,
    } as Partial<z.infer<ReturnType<typeof CreateInventoryAdjustmentSchema>>>,
    validators: {
      // onSubmitAsync: CreateInventoryAdjustmentSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementInventoryAdjustment)
          .create(value);

        toast.success("Inventory adjustment created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create adjustment: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateInventoryAdjustmentFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementInventoryAdjustmentRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateInventoryAdjustmentSchema>>
    >,
    validators: {
      // onSubmitAsync: UpdateInventoryAdjustmentSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementInventoryAdjustment)
          .update(record?.id!, value);

        toast.success("Inventory adjustment updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update adjustment: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
