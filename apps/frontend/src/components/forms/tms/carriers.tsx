import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCarrierInputSchema,
  UpdateCarrierInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCarrierSchema = CreateCarrierInputSchema();
export const updateCarrierSchema = UpdateCarrierInputSchema();

export const createCarrierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCarrierSchema>,
});

export const updateCarrierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCarrierSchema>,
});

export const CreateCarrierForm = withForm({
  ...createCarrierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Carrier</FieldLegend>
        <FieldDescription>Fill in the details for the new carrier.</FieldDescription>
        <FieldGroup>
          {/* Carrier Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Carrier Information</FieldLegend>
            <FieldDescription>Basic information about the carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Carrier Name *"
                    description="The name of the carrier company."
                    placeholder="Enter carrier name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="servicesOffered">
                {(field) => (
                  <field.InputField
                    label="Services Offered"
                    description="Types of services this carrier provides."
                    placeholder="e.g., Ground, Air, LTL, Truckload"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Contact Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact Information</FieldLegend>
            <FieldDescription>Primary contact details for the carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person"
                    description="Name of the primary contact."
                    placeholder="Enter contact person name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="contactEmail">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Email address of the contact person."
                    placeholder="contact@carrier.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone"
                    description="Phone number of the contact person."
                    placeholder="+1-234-567-8900"
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

export const UpdateCarrierForm = withForm({
  ...updateCarrierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Carrier</FieldLegend>
        <FieldDescription>Update the details for the carrier.</FieldDescription>
        <FieldGroup>
          {/* Carrier Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Carrier Information</FieldLegend>
            <FieldDescription>Update basic information about the carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Carrier Name"
                    description="The name of the carrier company."
                    placeholder="Enter carrier name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="servicesOffered">
                {(field) => (
                  <field.InputField
                    label="Services Offered"
                    description="Types of services this carrier provides."
                    placeholder="e.g., Ground, Air, LTL, Truckload"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Contact Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Contact Information</FieldLegend>
            <FieldDescription>Update primary contact details for the carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="contactPerson">
                {(field) => (
                  <field.InputField
                    label="Contact Person"
                    description="Name of the primary contact."
                    placeholder="Enter contact person name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="contactEmail">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Email address of the contact person."
                    placeholder="contact@carrier.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactPhone">
                {(field) => (
                  <field.InputField
                    type="tel"
                    label="Phone"
                    description="Phone number of the contact person."
                    placeholder="+1-234-567-8900"
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
