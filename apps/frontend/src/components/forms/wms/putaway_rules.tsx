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
        <FieldDescription>Define automated putaway location rules.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link rule to product, client, and warehouse.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product *"
                      description="Product this rule applies to."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client *"
                      description="Client for this rule."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse *"
                      description="Warehouse for this rule."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="preferredLocationId">
                  {(field) => (
                    <field.InputField
                      label="Preferred Location"
                      description="Preferred storage location."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Rule Configuration Section */}
          <FieldSet>
            <FieldLegend variant="label">Rule Configuration</FieldLegend>
            <FieldDescription>Location type, priority, and quantity constraints.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationType">
                  {(field) => (
                    <field.InputField
                      label="Location Type *"
                      description="Type of location (shelf, bin, floor, etc)."
                      placeholder="e.g., Shelf, Bin"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority *"
                      description="Rule priority (higher = preferred)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Min Quantity *"
                      description="Minimum quantity for rule application."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Quantity *"
                      description="Maximum quantity for location."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Threshold Section */}
          <FieldSet>
            <FieldLegend variant="label">Thresholds</FieldLegend>
            <FieldDescription>Weight and volume limitations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weightThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight Threshold"
                      description="Maximum weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="volumeThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Volume Threshold"
                      description="Maximum volume (m³)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Special Requirements Section */}
          <FieldSet>
            <FieldLegend variant="label">Special Requirements</FieldLegend>
            <FieldDescription>Environment and compliance requirements.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="requiresTemperatureControl">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Temperature Control"
                      description="Product needs temperature-controlled location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="requiresHazmatApproval">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Hazmat Approval"
                      description="Product is hazmat-approved location only."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isActive">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Active"
                    description="Rule is active and in use."
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

export const UpdatePutawayRuleForm = withForm({
  ...updatePutawayRuleFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Putaway Rule</FieldLegend>
        <FieldDescription>Update automated putaway location rules.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update product, client, and warehouse associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product"
                      description="Product this rule applies to."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Client for this rule."
                      placeholder="Client ID"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="warehouseId">
                  {(field) => (
                    <field.InputField
                      label="Warehouse"
                      description="Warehouse for this rule."
                      placeholder="Warehouse ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="preferredLocationId">
                  {(field) => (
                    <field.InputField
                      label="Preferred Location"
                      description="Preferred storage location."
                      placeholder="Location ID"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Rule Configuration Section */}
          <FieldSet>
            <FieldLegend variant="label">Rule Configuration</FieldLegend>
            <FieldDescription>Update location type and constraints.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="locationType">
                  {(field) => (
                    <field.InputField
                      label="Location Type"
                      description="Type of location (shelf, bin, floor, etc)."
                      placeholder="e.g., Shelf, Bin"
                    />
                  )}
                </form.AppField>
                <form.AppField name="priority">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Priority"
                      description="Rule priority (higher = preferred)."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="minQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Min Quantity"
                      description="Minimum quantity for rule application."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="maxQuantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Max Quantity"
                      description="Maximum quantity for location."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Threshold Section */}
          <FieldSet>
            <FieldLegend variant="label">Thresholds</FieldLegend>
            <FieldDescription>Update weight and volume limitations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="weightThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight Threshold"
                      description="Maximum weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="volumeThreshold">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Volume Threshold"
                      description="Maximum volume (m³)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Special Requirements Section */}
          <FieldSet>
            <FieldLegend variant="label">Special Requirements</FieldLegend>
            <FieldDescription>Update environment and compliance requirements.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="requiresTemperatureControl">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Temperature Control"
                      description="Product needs temperature-controlled location."
                    />
                  )}
                </form.AppField>
                <form.AppField name="requiresHazmatApproval">
                  {(field) => (
                    <field.InputField
                      type="checkbox"
                      label="Requires Hazmat Approval"
                      description="Product is hazmat-approved location only."
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="isActive">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Active"
                    description="Rule is active and in use."
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
