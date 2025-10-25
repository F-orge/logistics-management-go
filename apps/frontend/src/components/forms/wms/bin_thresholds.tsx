import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateBinThresholdInputSchema,
  UpdateBinThresholdInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createBinThresholdSchema = CreateBinThresholdInputSchema();
export const updateBinThresholdSchema = UpdateBinThresholdInputSchema();

export const createBinThresholdFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createBinThresholdSchema>,
});

export const updateBinThresholdFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateBinThresholdSchema>,
});

export const CreateBinThresholdForm = withForm({
  ...createBinThresholdFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Bin Threshold</FieldLegend>
        <FieldDescription>
          Fill in the details for the new bin threshold.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Threshold Details</FieldLegend>
            <form.AppField name="locationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="minQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reorderQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="alertThreshold">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateBinThresholdForm = withForm({
  ...updateBinThresholdFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Bin Threshold</FieldLegend>
        <FieldDescription>
          Update the details for the bin threshold.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Threshold Details</FieldLegend>
            <form.AppField name="locationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="minQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="reorderQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="alertThreshold">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
