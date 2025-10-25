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
        <FieldDescription>Add pricing rule to rate card.</FieldDescription>
        <FieldGroup>
          {/* Rate Card Relation Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Card Relation</FieldLegend>
            <FieldDescription>Link rule to rate card.</FieldDescription>
            <FieldGroup>
              <form.AppField name="rateCardId">
                {(field) => (
                  <field.InputField
                    label="Rate Card *"
                    description="Rate card this rule belongs to."
                    placeholder="Rate Card ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Rule Configuration Section */}
          <FieldSet>
            <FieldLegend variant="label">Rule Configuration</FieldLegend>
            <FieldDescription>Condition, value, and pricing model.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="condition">
                  {(field) => (
                    <field.InputField
                      label="Condition *"
                      description="Rule condition (weight, distance, etc)."
                      placeholder="e.g., Weight Range, Distance Zone"
                    />
                  )}
                </form.AppField>
                <form.AppField name="value">
                  {(field) => (
                    <field.InputField
                      label="Value *"
                      description="Condition value."
                      placeholder="e.g., 0-5kg, Zone A"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="pricingModel">
                {(field) => (
                  <field.InputField
                    label="Pricing Model *"
                    description="How pricing is calculated."
                    placeholder="e.g., Flat Rate, Per Unit, Tiered"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Price & Range Section */}
          <FieldSet>
            <FieldLegend variant="label">Price & Range</FieldLegend>
            <FieldDescription>Price and applicable ranges.</FieldDescription>
            <FieldGroup>
              <form.AppField name="price">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Price *"
                    description="Rule price."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Min Value"
                      description="Minimum value for rule application."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Value"
                      description="Maximum value for rule application."
                      placeholder="999999.99"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Priority & Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Priority & Status</FieldLegend>
            <FieldDescription>Rule priority and active status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority"
                      description="Rule priority (higher = applied first)."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="isActive">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Active"
                      description="Rule is active."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
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
        <FieldDescription>Update rate rule details.</FieldDescription>
        <FieldGroup>
          {/* Rate Card Relation Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Card Relation</FieldLegend>
            <FieldDescription>Update rate card association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="rateCardId">
                {(field) => (
                  <field.InputField
                    label="Rate Card"
                    description="Rate card this rule belongs to."
                    placeholder="Rate Card ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Rule Configuration Section */}
          <FieldSet>
            <FieldLegend variant="label">Rule Configuration</FieldLegend>
            <FieldDescription>Update condition and pricing model.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="condition">
                  {(field) => (
                    <field.InputField
                      label="Condition"
                      description="Rule condition."
                      placeholder="e.g., Weight Range, Distance"
                    />
                  )}
                </form.AppField>
                <form.AppField name="value">
                  {(field) => (
                    <field.InputField
                      label="Value"
                      description="Condition value."
                      placeholder="e.g., 0-5kg"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="pricingModel">
                {(field) => (
                  <field.InputField
                    label="Pricing Model"
                    description="How pricing is calculated."
                    placeholder="e.g., Flat Rate, Per Unit"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Price & Range Section */}
          <FieldSet>
            <FieldLegend variant="label">Price & Range</FieldLegend>
            <FieldDescription>Update price and ranges.</FieldDescription>
            <FieldGroup>
              <form.AppField name="price">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Price"
                    description="Rule price."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Min Value"
                      description="Minimum value."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Value"
                      description="Maximum value."
                      placeholder="999999.99"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Priority & Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Priority & Status</FieldLegend>
            <FieldDescription>Update priority and status.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority"
                      description="Rule priority (higher = first)."
                      placeholder="1"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="isActive">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Active"
                      description="Rule is active."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
