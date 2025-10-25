import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateTaskEventInputSchema,
  UpdateTaskEventInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createTaskEventSchema = CreateTaskEventInputSchema();
export const updateTaskEventSchema = UpdateTaskEventInputSchema();

export const createTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createTaskEventSchema>,
});

export const updateTaskEventFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateTaskEventSchema>,
});

export const CreateTaskEventForm = withForm({
  ...createTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Task Event</FieldLegend>
        <FieldDescription>
          Fill in the details for the new task event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
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

export const UpdateTaskEventForm = withForm({
  ...updateTaskEventFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Task Event</FieldLegend>
        <FieldDescription>
          Update the details for the task event.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Event Details</FieldLegend>
            <form.AppField name="deliveryTaskId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="notes">
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
