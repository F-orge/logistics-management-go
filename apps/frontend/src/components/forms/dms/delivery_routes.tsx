import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateDeliveryRouteInputSchema,
  UpdateDeliveryRouteInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createDeliveryRouteSchema = CreateDeliveryRouteInputSchema();
export const updateDeliveryRouteSchema = UpdateDeliveryRouteInputSchema();

export const createDeliveryRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createDeliveryRouteSchema>,
});

export const updateDeliveryRouteFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateDeliveryRouteSchema>,
});

export const CreateDeliveryRouteForm = withForm({
  ...createDeliveryRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Delivery Route</FieldLegend>
        <FieldDescription>
          Fill in the details for the new delivery route.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Route Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="routeDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="optimizedRouteData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="totalDistanceKm">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="estimatedDurationMinutes">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="completedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateDeliveryRouteForm = withForm({
  ...updateDeliveryRouteFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Delivery Route</FieldLegend>
        <FieldDescription>
          Update the details for the delivery route.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Route Details</FieldLegend>
            <form.AppField name="driverId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="routeDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="optimizedRouteData">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="totalDistanceKm">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="estimatedDurationMinutes">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
            <form.AppField name="completedAt">
              {(field) => <field.InputField type="datetime-local" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
