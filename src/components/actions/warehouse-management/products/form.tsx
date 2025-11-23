import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  CustomerRelationsCompaniesResponse,
  TypedPocketBase,
  WarehouseManagementProductsRecord,
  WarehouseManagementProductsResponse,
  WarehouseManagementSuppliersResponse,
} from "@/lib/pb.types";
import {
  CreateProductsSchema,
  ProductsSchema,
  UpdateProductsSchema,
} from "@/pocketbase/schemas/warehouse-management/products";

export type ProductsFormProps = {
  action?: "create" | "edit";
};

export const ProductsForm = withForm({
  defaultValues: {} as z.infer<typeof ProductsSchema>,
  props: {} as ProductsFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* sku - string */}
        <form.AppField name="sku">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="SKU"
              description="Stock keeping unit"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* name - string */}
        <form.AppField name="name">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Name"
              description="Product name"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* barcode - string */}
        <form.AppField name="barcode">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Barcode"
              description="Product barcode"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* description - string */}
        <form.AppField name="description">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Description"
              description="Product description"
            >
              <field.TextareaField />
            </field.Field>
          )}
        </form.AppField>
        {/* category - string */}
        <form.AppField name="category">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Category"
              description="Product category"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* price - number */}
        <form.AppField name="price">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Price"
              description="Unit price"
            >
              <field.NumberField />
            </field.Field>
          )}
        </form.AppField>
        {/* unit - string */}
        <form.AppField name="unit">
          {(field) => (
            <field.Field
              className="col-span-1"
              label="Unit"
              description="Measurement unit"
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
              description="Weight in kg"
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
        {/* status - enum */}
        <form.AppField name="status">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Status"
              description="Product status"
            >
              <field.SelectField
                options={[
                  { value: "active", label: "Active" },
                  { value: "discontinued", label: "Discontinued" },
                  { value: "obsolete", label: "Obsolete" },
                ]}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* supplier - string (relation) */}
        <form.AppField name="supplier">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Supplier"
              description="Primary supplier"
            >
              <field.RelationField<WarehouseManagementSuppliersResponse>
                collectionName={Collections.WarehouseManagementSuppliers}
                relationshipName="supplier"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* client - string (relation) */}
        <form.AppField name="client">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Client"
              description="Associated client"
            >
              <field.RelationField<CustomerRelationsCompaniesResponse>
                collectionName={Collections.CustomerRelationsCompanies}
                relationshipName="client"
                renderOption={(item) => `${item.name}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* images - file array */}
        <form.AppField name="images">
          {(field) => (
            <field.Field
              className="col-span-4"
              label="Images"
              description="Product images"
            >
              <field.FileField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateProductsFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      sku: "",
      name: "",
      barcode: "",
      description: "",
      category: undefined,
      price: 0,
      unit: "",
      weight: 0,
      length: 0,
      width: 0,
      height: 0,
      status: undefined,
      supplier: undefined,
      client: undefined,
      images: [],
    } as Partial<z.infer<ReturnType<typeof CreateProductsSchema>>>,
    validators: {
      onSubmitAsync: CreateProductsSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementProducts)
          .create(value);

        toast.success("Product created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create product: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateProductsFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementProductsRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateProductsSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateProductsSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementProducts)
          .update(record?.id!, value);

        toast.success("Product updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update product: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
