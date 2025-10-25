import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
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
import { toast } from "sonner";
import {
  CreateNotificationMutation,
  execute,
  UpdateNotificationMutation,
} from "@packages/graphql/client";
import { Notification } from "@/components/tables/crm/notifications";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

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
          {/* Notification Content Section */}
          <FieldSet>
            <FieldLegend variant="label">Notification Content</FieldLegend>
            <FieldDescription>
              The message and related content for this notification.
            </FieldDescription>
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
            <FieldDescription>
              Mark this notification as read or unread.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="isRead">
                {(field) => (
                  <field.CheckBoxField
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
            <FieldDescription>
              Link this notification to a user.
            </FieldDescription>
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
        <FieldDescription>
          Update the details for the notification.
        </FieldDescription>
        <FieldGroup>
          {/* Notification Content Section */}
          <FieldSet>
            <FieldLegend variant="label">Notification Content</FieldLegend>
            <FieldDescription>
              The message and related content for this notification.
            </FieldDescription>
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
            <FieldDescription>
              Mark this notification as read or unread.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="isRead">
                {(field) => (
                  <field.CheckBoxField
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
            <FieldDescription>
              Link this notification to a user.
            </FieldDescription>
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

export const NewNotificationDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/notifications" });
  const searchQuery = useSearch({ from: "/dashboard/crm/notifications" });

  const form = useAppForm({
    ...createNotificationFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateNotificationMutation,
        { notification: value }
      );

      if (data) {
        toast.success("Successfully created notification");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateNotificationForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateNotificationDialogForm = ({
  data,
}: {
  data: Notification[];
}) => {
  const navigate = useNavigate({ from: "/dashboard/crm/notifications" });
  const searchQuery = useSearch({ from: "/dashboard/crm/notifications" });

  const notification = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateNotificationFormOption,
    defaultValues: notification,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateNotificationMutation,
        { id: notification.id, notification: value }
      );

      if (data) {
        toast.success("Successfully updated notification");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateNotificationForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
