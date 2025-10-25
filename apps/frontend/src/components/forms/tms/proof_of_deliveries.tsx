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
        <FieldDescription>
          Fill in the details for the new proof of delivery.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Proof Details</FieldLegend>
            <form.AppField name="tripStopId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="filePath">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the proof of delivery.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Proof Details</FieldLegend>
            <form.AppField name="tripStopId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="filePath">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
