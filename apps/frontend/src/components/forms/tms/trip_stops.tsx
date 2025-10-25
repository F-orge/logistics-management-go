import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTripStopInputSchema,
  UpdateTripStopInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTripStopSchema = CreateTripStopInputSchema();
export const updateTripStopSchema = UpdateTripStopInputSchema();

export const createTripStopFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTripStopSchema>,
});

export const updateTripStopFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTripStopSchema>,
});

export const CreateTripStopForm = withForm({
  ...createTripStopFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Trip Stop</FieldLegend>
        <FieldDescription>
          Fill in the details for the new trip stop.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Stop Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="address">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="estimatedDepartureTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualDepartureTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateTripStopForm = withForm({
  ...updateTripStopFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Trip Stop</FieldLegend>
        <FieldDescription>
          Update the details for the trip stop.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Stop Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="shipmentId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sequence">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="address">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="estimatedArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualArrivalTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="estimatedDepartureTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="actualDepartureTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
