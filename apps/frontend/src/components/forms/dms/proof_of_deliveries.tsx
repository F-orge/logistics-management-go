import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDmsProofOfDeliveryInputSchema,
  UpdateDmsProofOfDeliveryInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDmsProofOfDeliverySchema = CreateDmsProofOfDeliveryInputSchema();
export const updateDmsProofOfDeliverySchema = UpdateDmsProofOfDeliveryInputSchema();

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
          <FieldSet>
            <FieldLegend>Proof of Delivery Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="filePath">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="signatureData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientName">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="verificationCode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
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
          <FieldSet>
            <FieldLegend>Proof of Delivery Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="filePath">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="signatureData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="recipientName">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="verificationCode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
