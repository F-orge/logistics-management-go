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
        <FieldDescription>
          Fill in the details for the new shipment leg event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="shipmentLegId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="statusMessage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="location">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="eventTimestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the shipment leg event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="shipmentLegId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="statusMessage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="location">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="eventTimestamp">
              {(field) => <field.InputField type="datetime" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
