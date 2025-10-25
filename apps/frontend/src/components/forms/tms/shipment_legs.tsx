import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateShipmentLegInputSchema,
  UpdateShipmentLegInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createShipmentLegSchema = CreateShipmentLegInputSchema();
export const updateShipmentLegSchema = UpdateShipmentLegInputSchema();

export const createShipmentLegFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createShipmentLegSchema>,
});

export const updateShipmentLegFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateShipmentLegSchema>,
});

export const CreateShipmentLegForm = withForm({
  ...createShipmentLegFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Shipment Leg</FieldLegend>
        <FieldDescription>Fill in the details for the new shipment leg.</FieldDescription>
        <FieldGroup>
          {/* Leg Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Leg Details</FieldLegend>
            <FieldDescription>Leg sequence and route information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="legSequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Leg Sequence *"
                    description="Order of this leg in the shipment journey."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Current status of the shipment leg."
                    placeholder="e.g., Pending, In Transit, Delivered"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Route Locations Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Locations</FieldLegend>
            <FieldDescription>Starting and ending points for this leg.</FieldDescription>
            <FieldGroup>
              <form.AppField name="startLocation">
                {(field) => (
                  <field.InputField
                    label="Start Location *"
                    description="Where this leg begins."
                    placeholder="e.g., Warehouse Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="endLocation">
                {(field) => (
                  <field.InputField
                    label="End Location *"
                    description="Where this leg ends."
                    placeholder="e.g., Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link to shipment, carrier, and trip information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="shipmentId">
                {(field) => (
                  <field.InputField
                    label="Shipment *"
                    description="The shipment this leg is part of."
                    placeholder="Shipment ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier"
                    description="The carrier handling this leg."
                    placeholder="Carrier ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="internalTripId">
                {(field) => (
                  <field.InputField
                    label="Internal Trip"
                    description="The internal trip ID for this leg."
                    placeholder="Trip ID"
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

export const UpdateShipmentLegForm = withForm({
  ...updateShipmentLegFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Shipment Leg</FieldLegend>
        <FieldDescription>Update the details for the shipment leg.</FieldDescription>
        <FieldGroup>
          {/* Leg Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Leg Details</FieldLegend>
            <FieldDescription>Update leg sequence and route information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="legSequence">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Leg Sequence"
                    description="Order of this leg in the shipment journey."
                    placeholder="1"
                    step="1"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current status of the shipment leg."
                    placeholder="e.g., Pending, In Transit, Delivered"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Route Locations Section */}
          <FieldSet>
            <FieldLegend variant="label">Route Locations</FieldLegend>
            <FieldDescription>Update starting and ending points for this leg.</FieldDescription>
            <FieldGroup>
              <form.AppField name="startLocation">
                {(field) => (
                  <field.InputField
                    label="Start Location"
                    description="Where this leg begins."
                    placeholder="e.g., Warehouse Address"
                  />
                )}
              </form.AppField>
              <form.AppField name="endLocation">
                {(field) => (
                  <field.InputField
                    label="End Location"
                    description="Where this leg ends."
                    placeholder="e.g., Distribution Center"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update shipment, carrier, and trip associations.</FieldDescription>
            <FieldGroup>
              <form.AppField name="shipmentId">
                {(field) => (
                  <field.InputField
                    label="Shipment"
                    description="The shipment this leg is part of."
                    placeholder="Shipment ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="carrierId">
                {(field) => (
                  <field.InputField
                    label="Carrier"
                    description="The carrier handling this leg."
                    placeholder="Carrier ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="internalTripId">
                {(field) => (
                  <field.InputField
                    label="Internal Trip"
                    description="The internal trip ID for this leg."
                    placeholder="Trip ID"
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
