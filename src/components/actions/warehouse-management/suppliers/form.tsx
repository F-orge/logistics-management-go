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
  WarehouseManagementSuppliersRecord,
} from "@/lib/pb.types";
import {
  CreateSuppliersSchema,
  SuppliersSchema,
  UpdateSuppliersSchema,
} from "@/pocketbase/schemas/warehouse-management/suppliers";

export type SuppliersFormProps = {
  action?: "create" | "edit";
};

export const SuppliersForm = withForm({
  defaultValues: {} as z.infer<typeof SuppliersSchema>,
  props: {} as SuppliersFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* name - string */}
        <form.AppField name="name">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Name"
              description="Supplier name"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* contactPerson - string */}
        <form.AppField name="contactPerson">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Contact Person"
              description="Name of contact person"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* email - string */}
        <form.AppField name="email">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Email"
              description="Email address"
            >
              <field.EmailField />
            </field.Field>
          )}
        </form.AppField>
        {/* phoneNumber - string */}
        <form.AppField name="phoneNumber">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Phone Number"
              description="Contact phone number"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* client - string (relation) */}
        <form.AppField name="client">
          {(field) => (
            <field.Field
              className="col-span-4"
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
      </form.FieldSet>
    );
  },
});

export const CreateSuppliersFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      name: "",
      contactPerson: "",
      email: "",
      phoneNumber: "",
      client: undefined,
    } as Partial<z.infer<ReturnType<typeof CreateSuppliersSchema>>>,
    validators: {
      onSubmitAsync: CreateSuppliersSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementSuppliers)
          .create(value);

        toast.success("Supplier created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create supplier: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateSuppliersFormOption = (
  pocketbase: TypedPocketBase,
  record?: WarehouseManagementSuppliersRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateSuppliersSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateSuppliersSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.WarehouseManagementSuppliers)
          .update(record?.id!, value);

        toast.success("Supplier updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update supplier: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
