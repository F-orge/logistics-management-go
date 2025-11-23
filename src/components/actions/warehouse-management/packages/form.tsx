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
  WarehouseManagementPackagesRecord,
  WarehouseManagementSalesOrdersResponse,
  WarehouseManagementWarehousesResponse,
} from "@/lib/pb.types";
import {
  CreatePackagesSchema,
  PackagesSchema,
  UpdatePackagesSchema,
} from "@/pocketbase/schemas/warehouse-management/packages";

export type PackagesFormProps = {
  action?: "create" | "edit";
};

export const PackagesForm = withForm({
  defaultValues: {} as z.infer<typeof PackagesSchema>,
  props: {} as PackagesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* packageNumber - string */}
        <form.AppField name="packageNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Package Number"
              description="Unique package identifier"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* salesOrder - string (relation) */}
        <form.AppField name="salesOrder">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Sales Order"
              description="Associated sales order"
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
              description="Warehouse location"
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
        {/* type - string */}
        <form.AppField name="type">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Type"
              description="Package type"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* weight - number */}
        <form.AppField name="weight">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Weight"
              description="Package weight in kg"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* length - number */}
        <form.AppField name="length">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Length"
              description="Length in cm"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* width - number */}
        <form.AppField name="width">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Width"
              description="Width in cm"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* height - number */}
        <form.AppField name="height">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Height"
              description="Height in cm"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* packedByUser - string (relation) */}
        <form.AppField name="packedByUser">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Packed By"
              description="User who packed the package"
            >
              <field.RelationField<UsersResponse>
                collectionName={Collections.Users}
                relationshipName="packedByUser"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* packedAt - date */}
        <form.AppField name="packedAt">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Packed At"
              description="Date package was packed"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
        {/* shippedAt - date */}
        <form.AppField name="shippedAt">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Shipped At"
              description="Date package was shipped"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
        {/* isFragile - boolean */}
        <form.AppField name="isFragile">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Fragile"
              description="Mark if fragile"
            >
              <field.BoolField />
            </field.Field>
          )}
        </form.AppField>
        {/* isHazmat - boolean */}
        <form.AppField name="isHazmat">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Hazmat"
              description="Contains hazardous materials"
            >
              <field.BoolField />
            </field.Field>
          )}
        </form.AppField>
        {/* requireSignature - boolean */}
        <form.AppField name="requireSignature">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Signature Required"
              description="Signature required on delivery"
            >
              <field.BoolField />
            </field.Field>
          )}
        </form.AppField>
        {/* insuranceValue - number */}
        <form.AppField name="insuranceValue">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Insurance Value"
              description="Declared insurance value"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* images - file array */}
        <form.AppField name="images">
          {(field) => (
            <field.Field
              className="col-span-4"
              label="Images"
              description="Package photos"
            >
              <field.FileField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreatePackagesFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      packageNumber: "",
      salesOrder: undefined,
      warehouse: undefined,
      type: "",
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      packedByUser: undefined,
      packedAt: undefined,
      shippedAt: undefined,
      isFragile: false,
      isHazmat: false,
      requireSignature: false,
      insuranceValue: 0,
      images: [],
    } as Partial<z.infer<ReturnType<typeof CreatePackagesSchema>>>,
    validators: {
      onSubmitAsync: CreatePackagesSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementPackages)
          .create(value);

        toast.success("Package created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create package: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdatePackagesFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementPackagesRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdatePackagesSchema>>
    >,
    validators: {
      onSubmitAsync: UpdatePackagesSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementPackages)
          .update(record?.id!, value);

        toast.success("Package updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update package: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
