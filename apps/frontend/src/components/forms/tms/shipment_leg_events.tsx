import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateShipmentLegEventInputSchema,
  UpdateShipmentLegEventInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createShipmentLegEventSchema = CreateShipmentLegEventInputSchema();
export const updateShipmentLegEventSchema = UpdateShipmentLegEventInputSchema();

export const createShipmentLegEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createShipmentLegEventSchema>,
});

export const updateShipmentLegEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateShipmentLegEventSchema>,
});

export const CreateShipmentLegEventForm = withForm({
  ...createShipmentLegEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Shipment Leg Event</FieldLegend>
        <FieldDescription>Fill in the details for the new shipment leg event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Status update and message for this event.</FieldDescription>
            <FieldGroup>
              <form.AppField name="statusMessage">
                {(field) => (
                  <field.InputField
                    label="Status Message *"
                    description="Update message describing the status change."
                    placeholder="e.g., In transit to distribution center"
                  />
                )}
              </form.AppField>
              <form.AppField name="location">
                {(field) => (
                  <field.InputField
                    label="Location"
                    description="Where the event occurred."
                    placeholder="Enter location details..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>When the event occurred and which leg it belongs to.</FieldDescription>
            <FieldGroup>
              <form.AppField name="eventTimestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Event Timestamp *"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentLegId">
                {(field) => (
                  <field.InputField
                    label="Shipment Leg *"
                    description="The shipment leg this event belongs to."
                    placeholder="Shipment Leg ID"
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

export const UpdateShipmentLegEventForm = withForm({
  ...updateShipmentLegEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Shipment Leg Event</FieldLegend>
        <FieldDescription>Update the details for the shipment leg event.</FieldDescription>
        <FieldGroup>
          {/* Event Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Event Details</FieldLegend>
            <FieldDescription>Update status message for this event.</FieldDescription>
            <FieldGroup>
              <form.AppField name="statusMessage">
                {(field) => (
                  <field.InputField
                    label="Status Message"
                    description="Update message describing the status change."
                    placeholder="e.g., In transit to distribution center"
                  />
                )}
              </form.AppField>
              <form.AppField name="location">
                {(field) => (
                  <field.InputField
                    label="Location"
                    description="Where the event occurred."
                    placeholder="Enter location details..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timestamp & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Timestamp & Relations</FieldLegend>
            <FieldDescription>Update timestamp and leg association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="eventTimestamp">
                {(field) => (
                  <field.InputField
                    type="datetime-local"
                    label="Event Timestamp"
                    description="When this event occurred."
                  />
                )}
              </form.AppField>
              <form.AppField name="shipmentLegId">
                {(field) => (
                  <field.InputField
                    label="Shipment Leg"
                    description="The shipment leg this event belongs to."
                    placeholder="Shipment Leg ID"
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
