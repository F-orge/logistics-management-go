import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCarrierRateInputSchema,
  UpdateCarrierRateInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCarrierRateSchema = CreateCarrierRateInputSchema();
export const updateCarrierRateSchema = UpdateCarrierRateInputSchema();

export const createCarrierRateFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCarrierRateSchema>,
});

export const updateCarrierRateFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCarrierRateSchema>,
});

export const CreateCarrierRateForm = withForm({
  ...createCarrierRateFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Carrier Rate</FieldLegend>
        <FieldDescription>
          Fill in the details for the new carrier rate.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rate Details</FieldLegend>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="origin">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destination">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="rate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="unit">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCarrierRateForm = withForm({
  ...updateCarrierRateFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Carrier Rate</FieldLegend>
        <FieldDescription>
          Update the details for the carrier rate.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rate Details</FieldLegend>
            <form.AppField name="carrierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="origin">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="destination">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="rate">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="unit">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
