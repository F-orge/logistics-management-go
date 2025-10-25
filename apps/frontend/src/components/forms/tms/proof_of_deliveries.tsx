import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateProofOfDeliveryInputSchema,
  UpdateProofOfDeliveryInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createProofOfDeliverySchema = CreateProofOfDeliveryInputSchema();
export const updateProofOfDeliverySchema = UpdateProofOfDeliveryInputSchema();

export const createProofOfDeliveryFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createProofOfDeliverySchema>,
});

export const updateProofOfDeliveryFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateProofOfDeliverySchema>,
});

export const CreateProofOfDeliveryForm = withForm({
  ...createProofOfDeliveryFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Proof of Delivery</FieldLegend>
        <FieldDescription>Fill in the details for the new proof of delivery.</FieldDescription>
        <FieldGroup>
          {/* Proof Documentation Section */}
          <FieldSet>
            <FieldLegend variant="label">Proof Documentation</FieldLegend>
            <FieldDescription>Type and file information for the proof.</FieldDescription>
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
                  <field.InputField
                    label="File Path"
                    description="Path to the proof file."
                    placeholder="/files/delivery_proof_20241001.jpg"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Geographic coordinates where proof was collected.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate."
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
                      description="Longitude coordinate."
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
            <FieldDescription>When the proof was collected and which trip stop.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp *"
                    description="When the proof was collected."
                  />
                )}
              </form.AppField>
              <form.AppField name="tripStopId">
                {(field) => (
                  <field.InputField
                    label="Trip Stop *"
                    description="The trip stop this proof is for."
                    placeholder="Trip Stop ID"
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

export const UpdateProofOfDeliveryForm = withForm({
  ...updateProofOfDeliveryFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Proof of Delivery</FieldLegend>
        <FieldDescription>Update the details for the proof of delivery.</FieldDescription>
        <FieldGroup>
          {/* Proof Documentation Section */}
          <FieldSet>
            <FieldLegend variant="label">Proof Documentation</FieldLegend>
            <FieldDescription>Update type and file information for the proof.</FieldDescription>
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
                  <field.InputField
                    label="File Path"
                    description="Path to the proof file."
                    placeholder="/files/delivery_proof_20241001.jpg"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Update geographic coordinates where proof was collected.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="latitude">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Latitude"
                      description="Latitude coordinate."
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
                      description="Longitude coordinate."
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
            <FieldDescription>Update timestamp and trip stop association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="timestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Timestamp"
                    description="When the proof was collected."
                  />
                )}
              </form.AppField>
              <form.AppField name="tripStopId">
                {(field) => (
                  <field.InputField
                    label="Trip Stop"
                    description="The trip stop this proof is for."
                    placeholder="Trip Stop ID"
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
