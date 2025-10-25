import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSupplierInputSchema,
  UpdateSupplierInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSupplierSchema = CreateSupplierInputSchema();
export const updateSupplierSchema = UpdateSupplierInputSchema();

export const createSupplierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSupplierSchema>,
});

export const updateSupplierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSupplierSchema>,
});

export const CreateSupplierForm = withForm({
  ...createSupplierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Supplier</FieldLegend>
        <FieldDescription>Add new supplier to the system.</FieldDescription>
        <FieldGroup>
          {/* Supplier Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Supplier Details</FieldLegend>
            <FieldDescription>Supplier name and contact information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="Supplier company name."
                    placeholder="Supplier name"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person *"
                    description="Primary contact name."
                    placeholder="Contact name"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="email">
                  {(field) => (
                    <field.InputField
                      type="email"
                      label="Email *"
                      description="Contact email address."
                      placeholder="email@supplier.com"
                    />
                  )}
                </form.AppField>
                <form.AppField name="phoneNumber">
                  {(field) => (
                    <field.InputField
                      type="tel"
                      label="Phone Number *"
                      description="Contact phone number."
                      placeholder="+1 (555) 000-0000"
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

export const UpdateSupplierForm = withForm({
  ...updateSupplierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Supplier</FieldLegend>
        <FieldDescription>Update supplier information.</FieldDescription>
        <FieldGroup>
          {/* Supplier Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Supplier Details</FieldLegend>
            <FieldDescription>Update supplier name and contact information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="Supplier company name."
                    placeholder="Supplier name"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person"
                    description="Primary contact name."
                    placeholder="Contact name"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="email">
                  {(field) => (
                    <field.InputField
                      type="email"
                      label="Email"
                      description="Contact email address."
                      placeholder="email@supplier.com"
                    />
                  )}
                </form.AppField>
                <form.AppField name="phoneNumber">
                  {(field) => (
                    <field.InputField
                      type="tel"
                      label="Phone Number"
                      description="Contact phone number."
                      placeholder="+1 (555) 000-0000"
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
