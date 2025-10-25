import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateNotificationInputSchema,
  UpdateNotificationInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createNotificationSchema = CreateNotificationInputSchema();
export const updateNotificationSchema = UpdateNotificationInputSchema();

export const createNotificationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createNotificationSchema>,
});

export const updateNotificationFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateNotificationSchema>,
});

export const CreateNotificationForm = withForm({
  ...createNotificationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Notification</FieldLegend>
        <FieldDescription>
          Fill in the details for the new notification.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Notification Details</FieldLegend>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="message">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isRead">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="link">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateNotificationForm = withForm({
  ...updateNotificationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Notification</FieldLegend>
        <FieldDescription>
          Update the details for the notification.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Notification Details</FieldLegend>
            <form.AppField name="userId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="message">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isRead">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="link">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
