import { formOptions } from "@tanstack/react-form";
import { UseNavigateResult } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import { FieldSeparator } from "@/components/ui/field";
import { withForm } from "@/components/ui/forms";
import { InputGroupButton } from "@/components/ui/input-group";
import {
  Collections,
  DeliveryManagementProofOfDeliveriesRecord,
  DeliveryManagementTasksResponse,
  TypedPocketBase,
  WarehouseManagementOutboundShipmentsRecord,
  WarehouseManagementPackagesRecord,
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
              <field.RelationField<
                DeliveryManagementTasksResponse<{
                  package: WarehouseManagementPackagesRecord;
                }>
              >
                collectionName={Collections.DeliveryManagementTasks}
                relationshipName="task"
                recordListOption={{
                  expand: "package",
                }}
                renderOption={(item) =>
                  `Task #${item.expand.package.packageNumber}`
                }
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
        {/* coordinates - geo point */}
        <form.AppField name="coordinates">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Coordinates"
              description="GPS coordinates of delivery location"
            >
              <field.GeoPointField />
            </field.Field>
          )}
        </form.AppField>
        {props.action === "create" && (
          <>
            <FieldSeparator className="col-span-full" />
            <form.FieldSet
              className="col-span-full"
              legend="Attachments"
              description="Upload files related to the campaign."
            >
              <form.AppField name="attachments" mode="array">
                {(field) => (
                  <>
                    {field.state.value?.map((_, index) => (
                      <form.AppField key={index} name={`attachments[${index}]`}>
                        {(subField) => (
                          <subField.Field className="mb-2">
                            <subField.FileField>
                              <InputGroupButton
                                onClick={() => field.removeValue(index)}
                                aria-label={`Remove attachment ${index + 1}`}
                              >
                                <X />
                              </InputGroupButton>
                            </subField.FileField>
                          </subField.Field>
                        )}
                      </form.AppField>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue(undefined as any)}
                    >
                      Add Attachments
                    </Button>
                  </>
                )}
              </form.AppField>
            </form.FieldSet>
          </>
        )}
        {/* timestamp - datetime */}
        <form.AppField name="timestamp">
          {(field) => (
            <field.Field
              className="col-span-full"
              label="Timestamp"
              description="Date and time of delivery"
            >
              <field.DateTimeField disabled />
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
      timestamp: new Date(),
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
