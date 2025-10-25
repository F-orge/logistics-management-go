import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDriverLocationInputSchema,
  UpdateDriverLocationInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDriverLocationSchema = CreateDriverLocationInputSchema();
export const updateDriverLocationSchema = UpdateDriverLocationInputSchema();

export const createDriverLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDriverLocationSchema>,
});

export const updateDriverLocationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDriverLocationSchema>,
});

export const CreateDriverLocationForm = withForm({
  ...createDriverLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Driver Location</FieldLegend>
        <FieldDescription>
          Fill in the details for the new driver location.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Location Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="altitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="accuracy">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="speedKmh">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="heading">
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

export const UpdateDriverLocationForm = withForm({
  ...updateDriverLocationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Driver Location</FieldLegend>
        <FieldDescription>
          Update the details for the driver location.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Location Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="latitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="altitude">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="accuracy">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="speedKmh">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="heading">
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
