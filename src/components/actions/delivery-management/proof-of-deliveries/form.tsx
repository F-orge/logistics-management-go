import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { withForm } from "@/components/ui/forms";
import {
  Collections,
  DeliveryManagementProofOfDeliveriesRecord,
  DeliveryManagementTasksResponse,
  TypedPocketBase,
} from "@/lib/pb.types";
import {
  CreateProofOfDeliveriesSchema,
  ProofOfDeliveriesSchema,
  UpdateProofOfDeliveriesSchema,
} from "@/pocketbase/schemas/delivery-management/proof-of-deliveries";

export type ProofOfDeliveriesFormProps = {
  action?: "create" | "edit";
};

export const ProofOfDeliveriesForm = withForm({
  defaultValues: {} as z.infer<typeof ProofOfDeliveriesSchema>,
  props: {} as ProofOfDeliveriesFormProps,
  render: ({ form, ...props }) => {
    return (
      <form.FieldSet
        fieldGroupProps={{
          className: "grid grid-cols-4 gap-4",
        }}
      >
        {/* task - string (relation) */}
        <form.AppField name="task">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Task"
              description="Select the delivery task."
            >
              <field.RelationField<DeliveryManagementTasksResponse>
                collectionName={Collections.DeliveryManagementTasks}
                relationshipName="task"
                renderOption={(item) => `Task #${item.sequence}`}
              />
            </field.Field>
          )}
        </form.AppField>
        {/* signatureData - file */}
        <form.AppField name="signatureData">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Signature"
              description="Recipient signature file"
            >
              <field.FileField />
            </field.Field>
          )}
        </form.AppField>
        {/* recipientName - string */}
        <form.AppField name="recipientName">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Recipient Name"
              description="Name of person receiving package"
            >
              <field.TextField />
            </field.Field>
          )}
        </form.AppField>
        {/* coordinates - json */}
        <form.AppField name="coordinates">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Coordinates"
              description="GPS coordinates of delivery location"
            >
              <field.JSONField />
            </field.Field>
          )}
        </form.AppField>
        {/* timestamp - datetime */}
        <form.AppField name="timestamp">
          {(field) => (
            <field.Field
              className="col-span-2"
              label="Timestamp"
              description="Date and time of delivery"
            >
              <field.DateTimeField />
            </field.Field>
          )}
        </form.AppField>
      </form.FieldSet>
    );
  },
});

export const CreateProofOfDeliveriesFormOption = (
  pocketbase: TypedPocketBase
) =>
  formOptions({
    defaultValues: {
      task: undefined,
      signatureData: undefined,
      recipientName: "",
      coordinates: undefined,
      timestamp: new Date().toISOString(),
    } as Partial<z.infer<ReturnType<typeof CreateProofOfDeliveriesSchema>>>,
    validators: {
      onSubmitAsync: CreateProofOfDeliveriesSchema(pocketbase),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.DeliveryManagementProofOfDeliveries)
          .create(value);

        toast.success("Proof of delivery created successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to create proof of delivery: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });

export const UpdateProofOfDeliveriesFormOption = (
  pocketbase: TypedPocketBase,
  record?: DeliveryManagementProofOfDeliveriesRecord
) =>
  formOptions({
    defaultValues: record as Partial<
      z.infer<ReturnType<typeof UpdateProofOfDeliveriesSchema>>
    >,
    validators: {
      onSubmitAsync: UpdateProofOfDeliveriesSchema(pocketbase, record),
    },
    onSubmitMeta: {} as {
      navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
    },
    onSubmit: async ({ value, meta }) => {
      try {
        await pocketbase
          .collection(Collections.DeliveryManagementProofOfDeliveries)
          .update(record?.id!, value);

        toast.success("Proof of delivery updated successfully!");
      } catch (error) {
        if (error instanceof ClientResponseError) {
          toast.error(
            `Failed to update proof of delivery: ${error.message} (${error.status})`
          );
        }
      } finally {
        meta.navigate!({ search: (prev) => ({ ...prev, action: undefined }) });
      }
    },
  });
