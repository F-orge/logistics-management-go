import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePutawayRuleInputSchema,
  UpdatePutawayRuleInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPutawayRuleSchema = CreatePutawayRuleInputSchema();
export const updatePutawayRuleSchema = UpdatePutawayRuleInputSchema();

export const createPutawayRuleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPutawayRuleSchema>,
});

export const updatePutawayRuleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePutawayRuleSchema>,
});

export const CreatePutawayRuleForm = withForm({
  ...createPutawayRuleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Putaway Rule</FieldLegend>
        <FieldDescription>
          Fill in the details for the new putaway rule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rule Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="preferredLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="locationType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="minQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="weightThreshold">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="volumeThreshold">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="requiresTemperatureControl">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="requiresHazmatApproval">
              {(field) => <field.InputField type="checkbox" />}
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

export const UpdatePutawayRuleForm = withForm({
  ...updatePutawayRuleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Putaway Rule</FieldLegend>
        <FieldDescription>
          Update the details for the putaway rule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rule Details</FieldLegend>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="warehouseId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="preferredLocationId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="locationType">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="priority">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="minQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="maxQuantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="weightThreshold">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="volumeThreshold">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="requiresTemperatureControl">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="requiresHazmatApproval">
              {(field) => <field.InputField type="checkbox" />}
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
