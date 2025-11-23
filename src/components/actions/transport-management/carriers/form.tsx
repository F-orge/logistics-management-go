import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  TransportManagementCarriersRecord,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CarriersSchema,
  CreateCarriersSchema,
  UpdateCarriersSchema,
} from "@/pocketbase/schemas/transport-management/carriers";

export type CarriersFormProps = {
  action?: "create" | "edit";
};

export const CarriersForm = withForm({
  defaultValues: {} as z.infer<typeof CarriersSchema>,
  props: {} as CarriersFormProps,
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
              className="col-span-full"
              label="Carrier Name"
              description="Official name of the carrier company"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* contactDetails - rich text */}
        <form.AppField name="contactDetails">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Contact Details"
              description="Contact information and details"
            >
              <field.RichEditorField />
            </field.Field>
          )}
        </form.AppField>
        {/* serviceOffered - rich text */}
        <form.AppField name="serviceOffered">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Services Offered"
              description="Description of services provided"
            >
              <field.RichEditorField />
            </field.Field>
          )}
        </form.AppField>
        {/* image - file */}
        <form.AppField name="image">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Company Image/Logo"
              description="Carrier company image or logo"
            >
              <field.FileField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateCarriersFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      name: "",
      contactDetails: "",
      serviceOffered: "",
      image: undefined,
    } as Partial<z.infer<ReturnType<typeof CreateCarriersSchema>>>,
    validators: {
      onSubmitAsync: CreateCarriersSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.TransportManagementCarriers)
          .create(value);

        toast.success("Carrier created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create carrier: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateCarriersFormOption = (
  pocketbase: TypedPocketBase,
  record?: TransportManagementCarriersRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateCarriersSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateCarriersSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.TransportManagementCarriers)
          .update(record?.id!, value);

        toast.success("Carrier updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update carrier: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
