import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSurchargeInputSchema,
  UpdateSurchargeInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSurchargeSchema = CreateSurchargeInputSchema();
export const updateSurchargeSchema = UpdateSurchargeInputSchema();

export const createSurchargeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSurchargeSchema>,
});

export const updateSurchargeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSurchargeSchema>,
});

export const CreateSurchargeForm = withForm({
  ...createSurchargeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Surcharge</FieldLegend>
        <FieldDescription>Add additional charge or fee.</FieldDescription>
        <FieldGroup>
          {/* Surcharge Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Surcharge Details</FieldLegend>
            <FieldDescription>Name, type, and description.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="Surcharge name."
                    placeholder="e.g., Fuel Surcharge, Hazmat Fee"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type *"
                    description="Type of surcharge."
                    placeholder="e.g., Fuel, Hazmat, Weather, Insurance"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed description."
                    placeholder="Enter description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Amount and calculation method.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount *"
                      description="Surcharge amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="calculationMethod">
                  {(field) => (
                    <field.InputField
                      label="Calculation Method *"
                      description="How surcharge is applied."
                      placeholder="e.g., Fixed, Percentage, Per Unit"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Validity Section */}
          <FieldSet>
            <FieldLegend variant="label">Validity</FieldLegend>
            <FieldDescription>Surcharge validity period.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="validFrom">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid From *"
                      description="When surcharge becomes effective."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="validTo">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid To *"
                      description="When surcharge expires."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Surcharge is active."
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

export const UpdateSurchargeForm = withForm({
  ...updateSurchargeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Surcharge</FieldLegend>
        <FieldDescription>Update surcharge details.</FieldDescription>
        <FieldGroup>
          {/* Surcharge Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Surcharge Details</FieldLegend>
            <FieldDescription>Update name, type, and description.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="Surcharge name."
                    placeholder="e.g., Fuel Surcharge, Hazmat Fee"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.InputField
                    label="Type"
                    description="Type of surcharge."
                    placeholder="e.g., Fuel, Hazmat, Weather"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Description."
                    placeholder="Enter description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Update amount and calculation method.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="amount">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Amount"
                      description="Surcharge amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="calculationMethod">
                  {(field) => (
                    <field.InputField
                      label="Calculation Method"
                      description="How surcharge is applied."
                      placeholder="e.g., Fixed, Percentage, Per Unit"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Validity Section */}
          <FieldSet>
            <FieldLegend variant="label">Validity</FieldLegend>
            <FieldDescription>Update validity period.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="validFrom">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid From"
                      description="When surcharge becomes effective."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="validTo">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid To"
                      description="When surcharge expires."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Update active status.</FieldDescription>
            <FieldGroup>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Surcharge is active."
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
