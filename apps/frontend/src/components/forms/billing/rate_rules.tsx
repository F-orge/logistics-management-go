import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateRateRuleInputSchema,
  UpdateRateRuleInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createRateRuleSchema = CreateRateRuleInputSchema();
export const updateRateRuleSchema = UpdateRateRuleInputSchema();

export const createRateRuleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createRateRuleSchema>,
});

export const updateRateRuleFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateRateRuleSchema>,
});

export const CreateRateRuleForm = withForm({
  ...createRateRuleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Rate Rule</FieldLegend>
        <FieldDescription>
          Fill in the details for the new rate rule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rule Details</FieldLegend>
            <form.AppField name="rateCardId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="condition">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="value">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="pricingModel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="minValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="priority">
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

export const UpdateRateRuleForm = withForm({
  ...updateRateRuleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Rate Rule</FieldLegend>
        <FieldDescription>
          Update the details for the rate rule.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rule Details</FieldLegend>
            <form.AppField name="rateCardId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="condition">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="value">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="pricingModel">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="minValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="maxValue">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="priority">
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
