import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  DeliveryManagementDriverLocationRecord,
  TransportManagementDriversResponse,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CreateDriverLocationSchema,
  DriverLocationSchema,
  UpdateDriverLocationSchema,
} from "@/pocketbase/schemas/delivery-management/driver-location";

export type DriverLocationFormProps = {
  action?: "create" | "edit";
};

export const DriverLocationForm = withForm({
  defaultValues: {} as z.infer<typeof DriverLocationSchema>,
  props: {} as DriverLocationFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* driver - string (relation) */}
        <form.AppField name="driver">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Driver"
              description="Select the driver for this location record."
            >
              <field.RelationField<TransportManagementDriversResponse>
                collectionName={Collections.TransportManagementDrivers}
                relationshipName="driver"
                renderOption={(item) => `${item.licenseNumber}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* coordinates - json */}
        <form.AppField name="coordinates">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Coordinates"
              description="GPS coordinates (latitude, longitude)"
            >
              <field.JSONField />
            </field.Field>
          )}
        </form.AppField>
        {/* heading - json */}
        <form.AppField name="heading">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Heading"
              description="Direction or heading data"
            >
              <field.JSONField />
            </field.Field>
          )}
        </form.AppField>
        {/* timestamp - datetime */}
        <form.AppField name="timestamp">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Timestamp"
              description="Date and time of location record"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateDriverLocationFormOption = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {
      driver: undefined,
      coordinates: undefined,
      heading: undefined,
      timestamp: new Date().toISOString(),
    } as Partial<z.infer<ReturnType<typeof CreateDriverLocationSchema>>>,
    validators: {
      onSubmitAsync: CreateDriverLocationSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.DeliveryManagementDriverLocation)
          .create(value);

        toast.success("Driver location created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create driver location: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateDriverLocationFormOption = (
  pocketbase: TypedPocketBase,
  record?: DeliveryManagementDriverLocationRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateDriverLocationSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateDriverLocationSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.DeliveryManagementDriverLocation)
          .update(record?.id!, value);

        toast.success("Driver location updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update driver location: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
