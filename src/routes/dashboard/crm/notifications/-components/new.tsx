import { useMutation } from '@tanstack/react-query';
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from '@tanstack/react-router';
import { useAppForm } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { ORPCInputs } from '@/orpc/client';
import { createNotification } from '@/queries/crm/notifications';
import { crmNotificationInsertSchema } from '@/schemas/crm/notifications';

const NewNotificationFormDialog = () => {
  const navigate = useNavigate({ from: '/dashboard/crm/notifications' });
  const searchQuery = useSearch({ from: '/dashboard/crm/notifications/' });
  const { queryClient } = useRouteContext({
    from: '/dashboard/crm/notifications/',
  });

  const createMutation = useMutation(createNotification, queryClient);

  const form = useAppForm({
    defaultValues: {} as ORPCInputs['crm']['createNotification'],
    validators: {
      onChange: crmNotificationInsertSchema,
    },
    onSubmit: async ({ value }) =>
      createMutation.mutateAsync(value, {
        onSuccess: () => {
          navigate({ search: (prev) => ({ ...prev, new: undefined }) });
        },
      }),
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new notification record.
          </DialogDescription>
        </DialogHeader>
        <FieldSeparator />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Notification Details</FieldLegend>
                <FieldDescription>
                  Provide the essential information for the notification.
                </FieldDescription>
                <FieldGroup>
                  <form.AppField name="userId">
                    {(field) => (
                      <field.TextField
                        label="User ID"
                        description="The ID of the user to whom the notification is sent."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="message">
                    {(field) => (
                      <field.TextAreaField
                        label="Message"
                        description="The content of the notification."
                        required
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="link">
                    {(field) => (
                      <field.TextField
                        label="Link"
                        description="The URL associated with the notification."
                      />
                    )}
                  </form.AppField>
                  <form.AppField name="isRead">
                    {(field) => (
                      <field.CheckBoxField
                        label="Is Read"
                        description="Indicates whether the notification has been read."
                      />
                    )}
                  </form.AppField>
                </FieldGroup>
              </FieldSet>
              <form.SubmitButton>Create Notification</form.SubmitButton>
            </FieldGroup>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewNotificationFormDialog;
