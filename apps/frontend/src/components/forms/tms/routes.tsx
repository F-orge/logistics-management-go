import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateRouteInputSchema,
  UpdateRouteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createRouteSchema = CreateRouteInputSchema();
export const updateRouteSchema = UpdateRouteInputSchema();

export const createRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createRouteSchema>,
});

export const updateRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateRouteSchema>,
});

export const CreateRouteForm = withForm({
  ...createRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Route</FieldLegend>
        <FieldDescription>
          Fill in the details for the new route.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Route Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="optimizedRouteData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="totalDistance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="totalDuration">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateRouteForm = withForm({
  ...updateRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Route</FieldLegend>
        <FieldDescription>
          Update the details for the route.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Route Details</FieldLegend>
            <form.AppField name="tripId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="optimizedRouteData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="totalDistance">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="totalDuration">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
