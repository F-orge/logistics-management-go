import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateGpsPingInputSchema,
  UpdateGpsPingInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createGpsPingSchema = CreateGpsPingInputSchema();
export const updateGpsPingSchema = UpdateGpsPingInputSchema();

export const createGpsPingFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createGpsPingSchema>,
});

export const updateGpsPingFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateGpsPingSchema>,
});

export const CreateGpsPingForm = withForm({
  ...createGpsPingFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create GPS Ping</FieldLegend>
        <FieldDescription>
          Fill in the details for the new GPS ping.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>GPS Ping Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateGpsPingForm = withForm({
  ...updateGpsPingFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update GPS Ping</FieldLegend>
        <FieldDescription>
          Update the details for the GPS ping.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>GPS Ping Details</FieldLegend>
            <form.AppField name="vehicleId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="timestamp">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
