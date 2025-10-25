import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCarrierRateInputSchema,
  UpdateCarrierRateInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCarrierRateSchema = CreateCarrierRateInputSchema();
export const updateCarrierRateSchema = UpdateCarrierRateInputSchema();

export const createCarrierRateFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCarrierRateSchema>,
});

export const updateCarrierRateFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCarrierRateSchema>,
});

export const CreateCarrierRateForm = withForm({
  ...createCarrierRateFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Carrier Rate</FieldLegend>
        <FieldDescription>Fill in the details for the new carrier rate.</FieldDescription>
        <FieldGroup>
          {/* Rate Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Details</FieldLegend>
            <FieldDescription>Configure the pricing for this route and service.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type *"
                    description="Type of service (Ground, Air, LTL, etc.)."
                    placeholder="e.g., Ground, Air, LTL"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="rate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Rate *"
                      description="The rate amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="unit">
                  {(field) => (
                    <field.InputField
                      label="Unit *"
                      description="Unit of measurement (per lb, per kg, per shipment)."
                      placeholder="e.g., per lb, per kg"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Route Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Information</FieldLegend>
            <FieldDescription>Specify the origin and destination for this rate.</FieldDescription>
            <FieldGroup>
              <form.AppField name="origin">
                {(field) => (
                  <field.InputField
                    label="Origin *"
                    description="Starting location (city, region, or code)."
                    placeholder="e.g., New York, NY"
                  />
                )}
              </form.AppField>
              <form.AppField name="destination">
                {(field) => (
                  <field.InputField
                    label="Destination *"
                    description="Ending location (city, region, or code)."
                    placeholder="e.g., Los Angeles, CA"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this rate to a carrier.</FieldDescription>
            <FieldGroup>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier *"
                    description="The carrier this rate applies to."
                    placeholder="Carrier ID"
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

export const UpdateCarrierRateForm = withForm({
  ...updateCarrierRateFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Carrier Rate</FieldLegend>
        <FieldDescription>Update the details for the carrier rate.</FieldDescription>
        <FieldGroup>
          {/* Rate Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Rate Details</FieldLegend>
            <FieldDescription>Update the pricing for this route and service.</FieldDescription>
            <FieldGroup>
              <form.AppField name="serviceType">
                {(field) => (
                  <field.InputField
                    label="Service Type"
                    description="Type of service (Ground, Air, LTL, etc.)."
                    placeholder="e.g., Ground, Air, LTL"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="rate">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Rate"
                      description="The rate amount."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="unit">
                  {(field) => (
                    <field.InputField
                      label="Unit"
                      description="Unit of measurement (per lb, per kg, per shipment)."
                      placeholder="e.g., per lb, per kg"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Route Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Information</FieldLegend>
            <FieldDescription>Update the origin and destination for this rate.</FieldDescription>
            <FieldGroup>
              <form.AppField name="origin">
                {(field) => (
                  <field.InputField
                    label="Origin"
                    description="Starting location (city, region, or code)."
                    placeholder="e.g., New York, NY"
                  />
                )}
              </form.AppField>
              <form.AppField name="destination">
                {(field) => (
                  <field.InputField
                    label="Destination"
                    description="Ending location (city, region, or code)."
                    placeholder="e.g., Los Angeles, CA"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update the carrier association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier"
                    description="The carrier this rate applies to."
                    placeholder="Carrier ID"
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
