import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTripInputSchema,
  UpdateTripInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTripSchema = CreateTripInputSchema();
export const updateTripSchema = UpdateTripInputSchema();

export const createTripFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTripSchema>,
});

export const updateTripFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTripSchema>,
});

export const CreateTripForm = withForm({
  ...createTripFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Trip</FieldLegend>
        <FieldDescription>
          Fill in the details for the new trip.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Trip Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="startLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateTripForm = withForm({
  ...updateTripFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Trip</FieldLegend>
        <FieldDescription>
          Update the details for the trip.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Trip Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="endTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="startLocation">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="startTime">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
