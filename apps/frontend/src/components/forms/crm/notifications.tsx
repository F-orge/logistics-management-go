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
        <FieldDescription>Fill in the details for the new notification.</FieldDescription>
        <FieldGroup>
          {/* Notification Content Section */}
          <FieldSet>
            <FieldLegend variant="label">Notification Content</FieldLegend>
            <FieldDescription>The message and related content for this notification.</FieldDescription>
            <FieldGroup>
              <form.AppField name="message">
                {(field) => (
                  <field.InputField
                    label="Message *"
                    description="The notification message."
                    placeholder="Enter notification message..."
                  />
                )}
              </form.AppField>
              <form.AppField name="link">
                {(field) => (
                  <field.InputField
                    label="Link"
                    description="Optional URL link associated with this notification."
                    placeholder="https://example.com"
                    type="url"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Mark this notification as read or unread.</FieldDescription>
            <FieldGroup>
              <form.AppField name="isRead">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Mark as Read"
                    description="Check if this notification has been read."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this notification to a user.</FieldDescription>
            <FieldGroup>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User *"
                    description="The user who will receive this notification."
                    placeholder="User ID"
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

export const UpdateNotificationForm = withForm({
  ...updateNotificationFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Notification</FieldLegend>
        <FieldDescription>Update the details for the notification.</FieldDescription>
        <FieldGroup>
          {/* Notification Content Section */}
          <FieldSet>
            <FieldLegend variant="label">Notification Content</FieldLegend>
            <FieldDescription>The message and related content for this notification.</FieldDescription>
            <FieldGroup>
              <form.AppField name="message">
                {(field) => (
                  <field.InputField
                    label="Message"
                    description="The notification message."
                    placeholder="Enter notification message..."
                  />
                )}
              </form.AppField>
              <form.AppField name="link">
                {(field) => (
                  <field.InputField
                    label="Link"
                    description="Optional URL link associated with this notification."
                    placeholder="https://example.com"
                    type="url"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status Section */}
          <FieldSet>
            <FieldLegend variant="label">Status</FieldLegend>
            <FieldDescription>Mark this notification as read or unread.</FieldDescription>
            <FieldGroup>
              <form.AppField name="isRead">
                {(field) => (
                  <field.InputField
                    type="checkbox"
                    label="Mark as Read"
                    description="Check if this notification has been read."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this notification to a user.</FieldDescription>
            <FieldGroup>
              <form.AppField name="userId">
                {(field) => (
                  <field.InputField
                    label="User"
                    description="The user who will receive this notification."
                    placeholder="User ID"
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
