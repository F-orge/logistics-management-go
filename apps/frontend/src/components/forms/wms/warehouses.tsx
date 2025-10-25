import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateWarehouseInputSchema,
  UpdateWarehouseInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createWarehouseSchema = CreateWarehouseInputSchema();
export const updateWarehouseSchema = UpdateWarehouseInputSchema();

export const createWarehouseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createWarehouseSchema>,
});

export const updateWarehouseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateWarehouseSchema>,
});

export const CreateWarehouseForm = withForm({
  ...createWarehouseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Warehouse</FieldLegend>
        <FieldDescription>Add new warehouse facility.</FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>Warehouse name and address.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="Warehouse name or facility ID."
                    placeholder="e.g., Warehouse A - East Coast"
                  />
                )}
              </form.AppField>
              <form.AppField name="address">
                {(field) => (
                  <field.InputField
                    label="Address *"
                    description="Street address."
                    placeholder="123 Warehouse St"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="city">
                  {(field) => (
                    <field.InputField
                      label="City *"
                      description="City name."
                      placeholder="New York"
                    />
                  )}
                </form.AppField>
                <form.AppField name="state">
                  {(field) => (
                    <field.InputField
                      label="State *"
                      description="State or province."
                      placeholder="NY"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="postalCode">
                  {(field) => (
                    <field.InputField
                      label="Postal Code *"
                      description="ZIP or postal code."
                      placeholder="10001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="country">
                  {(field) => (
                    <field.InputField
                      label="Country *"
                      description="Country name."
                      placeholder="USA"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Contact Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact Information</FieldLegend>
            <FieldDescription>
              Primary warehouse contact details.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person *"
                    description="Manager or contact name."
                    placeholder="John Smith"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="contactEmail">
                  {(field) => (
                    <field.InputField
                      type="email"
                      label="Contact Email *"
                      description="Contact email address."
                      placeholder="manager@warehouse.com"
                    />
                  )}
                </form.AppField>
                <form.AppField name="contactPhone">
                  {(field) => (
                    <field.InputField
                      type="tel"
                      label="Contact Phone *"
                      description="Contact phone number."
                      placeholder="+1 (555) 000-0000"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Settings Section */}
          <FieldSet>
            <FieldLegend variant="label">Settings</FieldLegend>
            <FieldDescription>
              Timezone and operational settings.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timezone">
                {(field) => (
                  <field.InputField
                    label="Timezone *"
                    description="Warehouse timezone."
                    placeholder="America/New_York"
                  />
                )}
              </form.AppField>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Warehouse is active and operational."
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

export const UpdateWarehouseForm = withForm({
  ...updateWarehouseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Warehouse</FieldLegend>
        <FieldDescription>Update warehouse facility details.</FieldDescription>
        <FieldGroup>
          {/* Location Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Location Information</FieldLegend>
            <FieldDescription>
              Update warehouse name and address.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="Warehouse name or facility ID."
                    placeholder="e.g., Warehouse A - East Coast"
                  />
                )}
              </form.AppField>
              <form.AppField name="address">
                {(field) => (
                  <field.InputField
                    label="Address"
                    description="Street address."
                    placeholder="123 Warehouse St"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="city">
                  {(field) => (
                    <field.InputField
                      label="City"
                      description="City name."
                      placeholder="New York"
                    />
                  )}
                </form.AppField>
                <form.AppField name="state">
                  {(field) => (
                    <field.InputField
                      label="State"
                      description="State or province."
                      placeholder="NY"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="postalCode">
                  {(field) => (
                    <field.InputField
                      label="Postal Code"
                      description="ZIP or postal code."
                      placeholder="10001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="country">
                  {(field) => (
                    <field.InputField
                      label="Country"
                      description="Country name."
                      placeholder="USA"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Contact Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact Information</FieldLegend>
            <FieldDescription>Update contact details.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person"
                    description="Manager or contact name."
                    placeholder="John Smith"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="contactEmail">
                  {(field) => (
                    <field.InputField
                      type="email"
                      label="Contact Email"
                      description="Contact email address."
                      placeholder="manager@warehouse.com"
                    />
                  )}
                </form.AppField>
                <form.AppField name="contactPhone">
                  {(field) => (
                    <field.InputField
                      type="tel"
                      label="Contact Phone"
                      description="Contact phone number."
                      placeholder="+1 (555) 000-0000"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Settings Section */}
          <FieldSet>
            <FieldLegend variant="label">Settings</FieldLegend>
            <FieldDescription>
              Update timezone and operational settings.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="timezone">
                {(field) => (
                  <field.InputField
                    label="Timezone"
                    description="Warehouse timezone."
                    placeholder="America/New_York"
                  />
                )}
              </form.AppField>
              <form.AppField name="isActive">
                {(field) => (
                  <field.CheckBoxField
                    label="Active"
                    description="Warehouse is active and operational."
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
