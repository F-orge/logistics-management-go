import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDriverInputSchema,
  UpdateDriverInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDriverSchema = CreateDriverInputSchema();
export const updateDriverSchema = UpdateDriverInputSchema();

export const createDriverFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDriverSchema>,
});

export const updateDriverFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDriverSchema>,
});

export const CreateDriverForm = withForm({
  ...createDriverFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Driver</FieldLegend>
        <FieldDescription>Fill in the details for the new driver.</FieldDescription>
        <FieldGroup>
          {/* License Information Section */}
          <FieldSet>
            <FieldLegend variant="label">License Information</FieldLegend>
            <FieldDescription>Driver's license and certification details.</FieldDescription>
            <FieldGroup>
              <form.AppField name="licenseNumber">
                {(field) => (
                  <field.InputField
                    label="License Number *"
                    description="Commercial driver's license number."
                    placeholder="e.g., A123456789"
                  />
                )}
              </form.AppField>
              <form.AppField name="licenseExpiryDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="License Expiry Date *"
                    description="When the license expires."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Contact Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Contact</FieldLegend>
            <FieldDescription>Driver status and contact information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the driver."
                    placeholder="e.g., Active, Inactive, On Leave"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Contact Phone"
                    description="Driver's phone number."
                    placeholder="+1-234-567-8900"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this driver to a user account.</FieldDescription>
            <FieldGroup>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User *"
                    description="Associated user account for this driver."
                    placeholder="User ID"
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

export const UpdateDriverForm = withForm({
  ...updateDriverFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Driver</FieldLegend>
        <FieldDescription>Update the details for the driver.</FieldDescription>
        <FieldGroup>
          {/* License Information Section */}
          <FieldSet>
            <FieldLegend variant="label">License Information</FieldLegend>
            <FieldDescription>Update driver's license and certification details.</FieldDescription>
            <FieldGroup>
              <form.AppField name="licenseNumber">
                {(field) => (
                  <field.InputField
                    label="License Number"
                    description="Commercial driver's license number."
                    placeholder="e.g., A123456789"
                  />
                )}
              </form.AppField>
              <form.AppField name="licenseExpiryDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="License Expiry Date"
                    description="When the license expires."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Contact Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Contact</FieldLegend>
            <FieldDescription>Update driver status and contact information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the driver."
                    placeholder="e.g., Active, Inactive, On Leave"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Contact Phone"
                    description="Driver's phone number."
                    placeholder="+1-234-567-8900"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update the user account association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User"
                    description="Associated user account for this driver."
                    placeholder="User ID"
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
