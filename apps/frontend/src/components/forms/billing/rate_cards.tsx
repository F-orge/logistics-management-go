import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateRateCardInputSchema,
  UpdateRateCardInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createRateCardSchema = CreateRateCardInputSchema();
export const updateRateCardSchema = UpdateRateCardInputSchema();

export const createRateCardFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createRateCardSchema>,
});

export const updateRateCardFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateRateCardSchema>,
});

export const CreateRateCardForm = withForm({
  ...createRateCardFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Rate Card</FieldLegend>
        <FieldDescription>Create a pricing rate card.</FieldDescription>
        <FieldGroup>
          {/* Rate Card Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Card Details</FieldLegend>
            <FieldDescription>Name, service type, and description.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="Rate card name."
                    placeholder="e.g., Standard Rates 2024"
                  />
                )}
              </form.AppField>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type *"
                    description="Type of service this applies to."
                    placeholder="e.g., Standard Shipping, Express, Overnight"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.InputField
                    label="Description"
                    description="Detailed description of rate card."
                    placeholder="Enter description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Validity Section */}
          <FieldSet>
            <FieldLegend variant="label">Validity</FieldLegend>
            <FieldDescription>Rate card validity period.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="validFrom">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid From *"
                      description="When rate card becomes effective."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="validTo">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid To *"
                      description="When rate card expires."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Relations</FieldLegend>
            <FieldDescription>Active status and created by user.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isActive">
                  {(field) => (
                    <field.CheckBoxField
                      label="Active"
                      description="Rate card is active."
                    />
                  )}
                </form.AppField>
                <form.AppField name="createdByUserId">
                  {(field) => (
                    <field.InputField
                      label="Created By"
                      description="User who created rate card."
                      placeholder="User ID"
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

export const UpdateRateCardForm = withForm({
  ...updateRateCardFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Rate Card</FieldLegend>
        <FieldDescription>Update rate card information.</FieldDescription>
        <FieldGroup>
          {/* Rate Card Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Card Details</FieldLegend>
            <FieldDescription>Update name, service type, and description.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="Rate card name."
                    placeholder="e.g., Standard Rates 2024"
                  />
                )}
              </form.AppField>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type"
                    description="Type of service."
                    placeholder="e.g., Standard, Express, Overnight"
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
                      description="When rate card becomes effective."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
                <form.AppField name="validTo">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Valid To"
                      description="When rate card expires."
                      placeholder="YYYY-MM-DD"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Relations</FieldLegend>
            <FieldDescription>Update active status and creator.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="isActive">
                  {(field) => (
                    <field.CheckBoxField
                      label="Active"
                      description="Rate card is active."
                    />
                  )}
                </form.AppField>
                <form.AppField name="createdByUserId">
                  {(field) => (
                    <field.InputField
                      label="Created By"
                      description="User who created rate card."
                      placeholder="User ID"
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
