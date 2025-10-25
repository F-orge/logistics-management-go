import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDmsProofOfDeliveryInputSchema,
  UpdateDmsProofOfDeliveryInputSchema,
  SearchDeliveryTasksQuery,
  execute,
  CreateDmsProofOfDeliveryMutation,
  UpdateDmsProofOfDeliveryMutation,
  DmsProofOfDeliveries,
} from "@packages/graphql/client";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const createDmsProofOfDeliverySchema =
  CreateDmsProofOfDeliveryInputSchema();
export const updateDmsProofOfDeliverySchema =
  UpdateDmsProofOfDeliveryInputSchema();

export const createDmsProofOfDeliveryFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDmsProofOfDeliverySchema>,
});

export const updateDmsProofOfDeliveryFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDmsProofOfDeliverySchema>,
});

export const CreateDmsProofOfDeliveryForm = withForm({
  ...createDmsProofOfDeliveryFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Proof of Delivery</FieldLegend>
        <FieldDescription>
          Fill in the details for the new proof of delivery.
        </FieldDescription>
        <FieldGroup>
          {/* Proof Documentation Section */}
          <FieldSet>
            <FieldLegend variant="label">Proof Documentation</FieldLegend>
            <FieldDescription>
              Evidence and media files for delivery proof.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Type of proof (photo, signature, video, etc.)."
                    placeholder="e.g., Photo, Signature, Video"
                  />
                )}
              </form.AppField>
              <form.AppField name="filePath">
                {(field) => (
                  <field.TextAreaField
                    label="File Path"
                    description="Path to the proof file (photo, video, etc.)."
                    placeholder="/files/delivery_proof_20241001.jpg"
                  />
                )}
              </form.AppField>
              <form.AppField name="signatureData">
                {(field) => (
                  <field.TextAreaField
                    label="Signature Data"
                    description="Digital signature data if applicable."
                    placeholder="Signature data (base64 or SVG)..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Recipient Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Recipient Information</FieldLegend>
            <FieldDescription>
              Details of the person who received the delivery.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="recipientName">
                {(field) => (
                  <field.InputField
                    label="Recipient Name"
                    description="Name of the person who received the delivery."
                    placeholder="Enter recipient name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="verificationCode">
                {(field) => (
                  <field.InputField
                    label="Verification Code"
                    description="Code or PIN verified by recipient."
                    placeholder="e.g., OTP or confirmation code"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Geographic location where delivery was completed.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of delivery location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of delivery location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              When delivery was completed and associated delivery task.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When the proof of delivery was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryTasksQuery,
                        { search: query || "" }
                      );
                      return (data?.dms?.deliveryTasks || []).map((item) => ({
                        value: item.value,
                        label: item.label || item.value,
                      }));
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Task *"
                    description="The delivery task this proof is for."
                    placeholder="Search delivery task..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDmsProofOfDeliveryForm = withForm({
  ...updateDmsProofOfDeliveryFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Proof of Delivery</FieldLegend>
        <FieldDescription>
          Update the details for the proof of delivery.
        </FieldDescription>
        <FieldGroup>
          {/* Proof Documentation Section */}
          <FieldSet>
            <FieldLegend variant="label">Proof Documentation</FieldLegend>
            <FieldDescription>
              Update evidence and media files for delivery proof.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Type of proof (photo, signature, video, etc.)."
                    placeholder="e.g., Photo, Signature, Video"
                  />
                )}
              </form.AppField>
              <form.AppField name="filePath">
                {(field) => (
                  <field.TextAreaField
                    label="File Path"
                    description="Path to the proof file (photo, video, etc.)."
                    placeholder="/files/delivery_proof_20241001.jpg"
                  />
                )}
              </form.AppField>
              <form.AppField name="signatureData">
                {(field) => (
                  <field.TextAreaField
                    label="Signature Data"
                    description="Digital signature data if applicable."
                    placeholder="Signature data (base64 or SVG)..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Recipient Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Recipient Information</FieldLegend>
            <FieldDescription>
              Update details of the person who received the delivery.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="recipientName">
                {(field) => (
                  <field.InputField
                    label="Recipient Name"
                    description="Name of the person who received the delivery."
                    placeholder="Enter recipient name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="verificationCode">
                {(field) => (
                  <field.InputField
                    label="Verification Code"
                    description="Code or PIN verified by recipient."
                    placeholder="e.g., OTP or confirmation code"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Update geographic location where delivery was completed.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate of delivery location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="longitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Longitude"
                      description="Longitude coordinate of delivery location."
                      placeholder="0.000000"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>
              Update timestamp and associated delivery task.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When the proof of delivery was recorded."
                  />
                )}
              </form.AppField>
              <form.AppField name="deliveryTaskId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchDeliveryTasksQuery,
                        { search: query || "" }
                      );
                      return (data?.dms?.deliveryTasks || []).map((item) => ({
                        value: item.value,
                        label: item.label || item.value,
                      }));
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Delivery Task"
                    description="The delivery task this proof is for."
                    placeholder="Search delivery task..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const NewDmsProofOfDeliveryDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/dms/proof-of-deliveries" });
  const searchQuery = useSearch({ from: "/dashboard/dms/proof-of-deliveries" });

  const form = useAppForm({
    ...createDmsProofOfDeliveryFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateDmsProofOfDeliveryMutation,
        { dmsProofOfDelivery: value }
      );

      if (data) {
        toast.success("Successfully created proof of delivery");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateDmsProofOfDeliveryForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateDmsProofOfDeliveryDialogForm = ({
  data,
}: {
  data: DmsProofOfDeliveries[];
}) => {
  const navigate = useNavigate({ from: "/dashboard/dms/proof-of-deliveries" });
  const searchQuery = useSearch({ from: "/dashboard/dms/proof-of-deliveries" });

  const dmsProofOfDelivery = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateDmsProofOfDeliveryFormOption,
    defaultValues: dmsProofOfDelivery,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateDmsProofOfDeliveryMutation,
        { id: dmsProofOfDelivery.id, dmsProofOfDelivery: value }
      );

      if (data) {
        toast.success("Successfully updated proof of delivery");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateDmsProofOfDeliveryForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
